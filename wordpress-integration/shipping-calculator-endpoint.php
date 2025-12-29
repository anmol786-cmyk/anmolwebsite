<?php
/**
 * Custom REST API Endpoint for Shipping Calculations
 *
 * This file should be added to your WordPress site as a plugin or in functions.php
 * It exposes shipping calculations with all your custom rules to the headless frontend
 *
 * Installation:
 * 1. Create a file: wp-content/plugins/anmol-shipping-api/anmol-shipping-api.php
 * 2. Copy this entire code
 * 3. Activate the plugin in WordPress admin
 */

// Plugin Header (if using as plugin)
/*
Plugin Name: Anmol Shipping Calculator API
Description: Custom REST API endpoints for headless WooCommerce shipping calculations
Version: 1.0.0
Author: Anmol Sweets & Restaurant
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom REST API routes
 */
add_action('rest_api_init', function () {
    // Calculate shipping for cart
    register_rest_route('anmol/v1', '/shipping/calculate', array(
        'methods' => 'POST',
        'callback' => 'anmol_calculate_shipping',
        'permission_callback' => '__return_true',
        'args' => array(
            'items' => array(
                'required' => true,
                'type' => 'array',
            ),
            'postcode' => array(
                'required' => true,
                'type' => 'string',
            ),
            'city' => array(
                'required' => false,
                'type' => 'string',
            ),
            'country' => array(
                'required' => false,
                'type' => 'string',
                'default' => 'SE',
            ),
        ),
    ));

    // Get all shipping zones with methods
    register_rest_route('anmol/v1', '/shipping/zones', array(
        'methods' => 'GET',
        'callback' => 'anmol_get_shipping_zones',
        'permission_callback' => '__return_true',
    ));

    // Validate shipping restrictions
    register_rest_route('anmol/v1', '/shipping/validate', array(
        'methods' => 'POST',
        'callback' => 'anmol_validate_shipping',
        'permission_callback' => '__return_true',
    ));
});

/**
 * Calculate shipping for given cart items and address
 */
function anmol_calculate_shipping($request) {
    $params = $request->get_params();
    $items = $params['items'];
    $postcode = $params['postcode'];
    $city = isset($params['city']) ? $params['city'] : '';
    $country = isset($params['country']) ? $params['country'] : 'SE';

    try {
        // Initialize WooCommerce if not already
        if (!function_exists('WC')) {
            return new WP_Error('wc_not_found', 'WooCommerce not found', array('status' => 500));
        }

        // Create a virtual cart to calculate shipping
        WC()->cart->empty_cart();

        $cart_subtotal = 0;
        $cart_weight = 0;
        $restricted_products = array();
        $product_categories = array();

        // Add items to virtual cart and collect data
        foreach ($items as $item) {
            $product_id = $item['productId'];
            $quantity = $item['quantity'];
            $variation_id = isset($item['variationId']) ? $item['variationId'] : 0;

            $product = wc_get_product($variation_id ? $variation_id : $product_id);

            if (!$product) {
                continue;
            }

            // Add to cart
            WC()->cart->add_to_cart($product_id, $quantity, $variation_id);

            // Calculate totals
            $cart_subtotal += $product->get_price() * $quantity;
            $cart_weight += $product->get_weight() * $quantity;

            // Collect categories
            $terms = get_the_terms($product_id, 'product_cat');
            if ($terms && !is_wp_error($terms)) {
                foreach ($terms as $term) {
                    $product_categories[] = $term->slug;
                }
            }

            // Check for shipping restrictions
            $shipping_class = $product->get_shipping_class();
            $restriction = get_post_meta($product_id, '_shipping_restriction', true);

            // Check if product is restricted for this location
            if (anmol_is_product_restricted($product, $postcode, $country, $shipping_class, $restriction)) {
                $restricted_products[] = array(
                    'product_id' => $product_id,
                    'product_name' => $product->get_name(),
                    'reason' => anmol_get_restriction_reason($shipping_class, $restriction, $postcode, $country),
                );
            }
        }

        // If there are restricted products, return error
        if (!empty($restricted_products)) {
            return array(
                'success' => false,
                'restricted_products' => $restricted_products,
                'available_methods' => array(),
            );
        }

        // Set customer location for shipping calculation
        WC()->customer->set_shipping_country($country);
        WC()->customer->set_shipping_postcode($postcode);
        WC()->customer->set_shipping_city($city);

        // Calculate shipping
        WC()->cart->calculate_totals();
        WC()->cart->calculate_shipping();

        // Get available shipping packages
        $packages = WC()->shipping()->get_packages();
        $available_methods = array();

        foreach ($packages as $package_key => $package) {
            $rates = $package['rates'];

            foreach ($rates as $rate_id => $rate) {
                $method_data = array(
                    'id' => $rate->get_id(),
                    'method_id' => $rate->get_method_id(),
                    'label' => $rate->get_label(),
                    'cost' => $rate->get_cost(),
                    'total_cost' => $rate->get_cost() + array_sum($rate->get_taxes()),
                    'tax' => array_sum($rate->get_taxes()),
                    'meta_data' => $rate->get_meta_data(),
                );

                // Apply custom shipping rules
                $method_data = anmol_apply_custom_shipping_rules(
                    $method_data,
                    $cart_subtotal,
                    $cart_weight,
                    $product_categories,
                    $postcode,
                    $country
                );

                if ($method_data) {
                    $available_methods[] = $method_data;
                }
            }
        }

        // Check for free shipping threshold (2000 SEK)
        $free_shipping_threshold = 2000;
        if ($cart_subtotal >= $free_shipping_threshold) {
            // Add or update free shipping method
            $has_free_shipping = false;
            foreach ($available_methods as &$method) {
                if ($method['method_id'] === 'free_shipping') {
                    $has_free_shipping = true;
                    $method['cost'] = 0;
                    $method['total_cost'] = 0;
                }
            }

            // If no free shipping method exists, create one
            if (!$has_free_shipping) {
                $available_methods[] = array(
                    'id' => 'free_shipping:custom',
                    'method_id' => 'free_shipping',
                    'label' => 'Free Shipping (Orders over 2000 SEK)',
                    'cost' => 0,
                    'total_cost' => 0,
                    'tax' => 0,
                    'meta_data' => array(),
                );
            }
        }

        // Clear the virtual cart
        WC()->cart->empty_cart();

        return array(
            'success' => true,
            'cart_subtotal' => $cart_subtotal,
            'cart_weight' => $cart_weight,
            'available_methods' => $available_methods,
            'restricted_products' => array(),
            'free_shipping_threshold' => $free_shipping_threshold,
            'free_shipping_available' => $cart_subtotal >= $free_shipping_threshold,
            'amount_to_free_shipping' => max(0, $free_shipping_threshold - $cart_subtotal),
        );

    } catch (Exception $e) {
        return new WP_Error('calculation_error', $e->getMessage(), array('status' => 500));
    }
}

/**
 * Check if product is restricted for given location
 */
function anmol_is_product_restricted($product, $postcode, $country, $shipping_class, $restriction) {
    // Check for restaurant food category restrictions
    $terms = get_the_terms($product->get_id(), 'product_cat');
    if ($terms && !is_wp_error($terms)) {
        foreach ($terms as $term) {
            // Restaurant food can only be shipped within Stockholm
            if (in_array($term->slug, array('restaurant-food', 'fresh-food', 'perishable', 'catering'))) {
                if (!anmol_is_stockholm_postcode($postcode)) {
                    return true;
                }
            }
        }
    }

    // Check shipping class restrictions
    if ($shipping_class === 'stockholm-only' && !anmol_is_stockholm_postcode($postcode)) {
        return true;
    }

    // Check custom restriction meta
    if ($restriction === 'stockholm_only' && !anmol_is_stockholm_postcode($postcode)) {
        return true;
    }

    if ($restriction === 'sweden_only' && $country !== 'SE') {
        return true;
    }

    return false;
}

/**
 * Get restriction reason message
 */
function anmol_get_restriction_reason($shipping_class, $restriction, $postcode, $country) {
    if ($shipping_class === 'stockholm-only' || $restriction === 'stockholm_only') {
        return 'This product can only be shipped within Stockholm area (postcodes 100 00 - 199 99)';
    }

    if ($restriction === 'sweden_only' && $country !== 'SE') {
        return 'This product can only be shipped within Sweden';
    }

    return 'This product cannot be shipped to your location';
}

/**
 * Check if postcode is in Stockholm area
 */
function anmol_is_stockholm_postcode($postcode) {
    $normalized = preg_replace('/\s+/', '', $postcode);
    $prefix = substr($normalized, 0, 3);

    if (strlen($prefix) < 3 || !is_numeric($prefix)) {
        return false;
    }

    $prefix_num = intval($prefix);
    return $prefix_num >= 100 && $prefix_num <= 199;
}

/**
 * Apply custom shipping rules (minimum order, weight-based, etc.)
 */
function anmol_apply_custom_shipping_rules($method, $cart_subtotal, $cart_weight, $categories, $postcode, $country) {
    // Minimum order value for shipping
    $minimum_order = 550; // 550 SEK minimum

    if ($cart_subtotal < $minimum_order) {
        // Don't allow shipping if below minimum
        return null;
    }

    // Weight-based shipping rates
    // Replace the base cost with weight-based calculation
    if ($method['method_id'] === 'flat_rate' || $method['method_id'] === 'local_delivery') {
        $weight_cost = 0;

        if ($cart_weight <= 3) {
            $weight_cost = 90;
        } elseif ($cart_weight <= 5) {
            $weight_cost = 125;
        } elseif ($cart_weight <= 10) {
            $weight_cost = 185;
        } elseif ($cart_weight <= 15) {
            $weight_cost = 225;
        } elseif ($cart_weight <= 25.99) {
            $weight_cost = 285;
        } else {
            // For orders over 26kg, add extra cost
            $weight_cost = 285 + (($cart_weight - 25.99) * 15); // 15 SEK per kg over 26kg
        }

        $method['cost'] = $weight_cost;
        $method['total_cost'] = $weight_cost + $method['tax'];
        $method['label'] = $method['label'] . ' (' . $cart_weight . 'kg)';
    }

    return $method;
}

/**
 * Get all shipping zones with their methods
 */
function anmol_get_shipping_zones($request) {
    if (!function_exists('WC')) {
        return new WP_Error('wc_not_found', 'WooCommerce not found', array('status' => 500));
    }

    $zones = WC_Shipping_Zones::get_zones();
    $zones_data = array();

    foreach ($zones as $zone) {
        $zone_obj = new WC_Shipping_Zone($zone['zone_id']);
        $shipping_methods = $zone_obj->get_shipping_methods(true);

        $methods = array();
        foreach ($shipping_methods as $method) {
            $methods[] = array(
                'id' => $method->id,
                'title' => $method->title,
                'enabled' => $method->enabled,
                'method_id' => $method->id,
            );
        }

        $zones_data[] = array(
            'zone_id' => $zone['zone_id'],
            'zone_name' => $zone['zone_name'],
            'zone_locations' => $zone['zone_locations'],
            'shipping_methods' => $methods,
        );
    }

    return array(
        'success' => true,
        'zones' => $zones_data,
    );
}

/**
 * Validate shipping for cart
 */
function anmol_validate_shipping($request) {
    // Similar to calculate but just returns validation
    $result = anmol_calculate_shipping($request);

    if (is_wp_error($result)) {
        return $result;
    }

    return array(
        'success' => $result['success'],
        'valid' => $result['success'] && empty($result['restricted_products']),
        'restricted_products' => $result['restricted_products'],
        'minimum_order_met' => $result['cart_subtotal'] >= 550,
        'minimum_order_required' => 550,
        'cart_subtotal' => $result['cart_subtotal'],
    );
}
