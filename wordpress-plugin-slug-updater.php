<?php
/**
 * Plugin Name: Product Slug Updater
 * Description: One-click bulk update product slugs to match old URLs
 * Version: 1.0
 * Author: Royal Sweets
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Add admin menu
add_action('admin_menu', 'slug_updater_menu');

function slug_updater_menu() {
    add_submenu_page(
        'tools.php',
        'Update Product Slugs',
        'Update Product Slugs',
        'manage_options',
        'update-product-slugs',
        'slug_updater_page'
    );
}

// Product slug mappings (from your Google Search Console URLs)
function get_slug_mappings() {
    return array(
        1013 => 'iftar-deal-2',
        1089 => 'kaju-katli',
        1184 => 'boondi-phulkian-pakoria-light-delectable-savoury-delicacy',
        936 => 'kulcha',
        991 => 'chicken-chilli-lamm-beef-chili-curry',
        1092 => 'daal-mash-roll-patisa-premium-sweets-of-stockholm',
        980 => 'cutlus-gulab-jamun-the-royal-treat-by-royal-sweets',
        1098 => 'ballu-shahi-the-royal-treat-by-royal-sweets-restaurant',
        1106 => 'rasgulla-ethnic-indo-pak-sweetmeat-delicacy',
        1099 => 'besan-ladu-or-laddu-most-famous-subcontinental-sweet',
        927 => 'chana-cholle-lahori-channay-for-perfect-breakfast',
        1179 => 'vegetable-biryani-vegetarian-food-in-stockholm',
        840 => 'chocolate-roll-patisa-premium-sweets-of-stockholm',
        1108 => 'cream-gullab-jamun-stuffed-desi-sweets',
        1185 => 'cream-chum-chum-stuffed-chum-chum-sweets',
        844 => 'shaker-parey-shakar-para-best-sweets-in-town',
        1102 => 'mysore-pak-sweets-by-royal-sweets-restaurant-stockholm',
        1095 => 'sohan-halwa-tiki-no-1-sweets-shop-in-stockholm',
        998 => 'achar-gosht-lamm-beef-chicken-pickle-flavour-curry',
        849 => 'vegetable-pakora-popular-indian-snacks-in-stockholm',
        945 => 'beef-nehari-best-nihari-in-stockholm',
        943 => 'halwa-puri-most-famous-halwa-puri-in-stockholm',
        829 => 'milky-patisa-no-1-patisa-sweets-in-stockholm',
        1018 => 'party-deal-veg-deal',
        942 => 'lachha-paratha-best-breakfast-in-stockholm',
        1177 => 'lamm-biryani-tastiest-biryani-in-stockholm',
        851 => 'goll-gapey-gol-gapay-time-for-khata-meetha-chat-pata-food',
        992 => 'chicken-madras-lamm-madras-best-madras-curry',
        1002 => 'palak-gosht-spinach-and-lamb-curry',
        1086 => 'coconut-burfi-premium-sweets-by-royal-sweets',
        1093 => 'akhrot-halwa-walnut-halwa-true-taste-of-home',
        1178 => 'shahi-biryani-authentic-biryani-in-stockholm',
        1107 => 'khoya-peda-mawa-peda-best-peda-shop-in-stockholm',
        939 => 'poori-weekend-best-puri-in-stockholm',
        923 => 'seekh-kebab-juicy-and-flavorful-kebabs-by-royal-restaurant',
        909 => 'butter-chicken-yummiest-buttery-chicken-curry-in-stockholm',
        989 => 'mango-chicken-best-of-royal-sweets-restaurant',
        850 => 'chana-chaat-your-new-favorite-chana-chaat-place-is-here',
        1113 => 'keema-samosa-king-of-all-samosas-by-royal-sweets',
    );
}

// Admin page
function slug_updater_page() {
    ?>
    <div class="wrap">
        <h1>Product Slug Updater</h1>
        <p>This will update product slugs to match your old URLs from Google Search Console.</p>

        <?php
        if (isset($_POST['update_slugs']) && check_admin_referer('update_product_slugs')) {
            update_product_slugs();
        }
        ?>

        <div class="card" style="max-width: 800px; margin-top: 20px;">
            <h2>Update Summary</h2>
            <p><strong>Total Products to Update:</strong> <?php echo count(get_slug_mappings()); ?></p>
            <p><strong>What will happen:</strong></p>
            <ul>
                <li>✅ Product URLs will change to match old Google indexed URLs</li>
                <li>✅ No products will be deleted</li>
                <li>✅ Only the slug (URL) will change</li>
                <li>✅ Product names, prices, descriptions stay the same</li>
                <li>✅ After update, you need to flush permalinks (Settings → Permalinks → Save)</li>
            </ul>

            <form method="post" onsubmit="return confirm('Are you sure you want to update all product slugs?');">
                <?php wp_nonce_field('update_product_slugs'); ?>
                <input type="hidden" name="update_slugs" value="1">
                <p>
                    <button type="submit" class="button button-primary button-hero">
                        🚀 Update All Product Slugs Now
                    </button>
                </p>
            </form>
        </div>

        <div class="card" style="max-width: 800px; margin-top: 20px;">
            <h3>Products to be Updated</h3>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>New Slug</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $mappings = get_slug_mappings();
                    foreach ($mappings as $id => $slug) {
                        $product = wc_get_product($id);
                        if ($product) {
                            echo '<tr>';
                            echo '<td>' . $id . '</td>';
                            echo '<td>' . esc_html($product->get_name()) . '</td>';
                            echo '<td><code>' . esc_html($slug) . '</code></td>';
                            echo '</tr>';
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php
}

// Update function
function update_product_slugs() {
    $mappings = get_slug_mappings();
    $success = 0;
    $failed = 0;

    echo '<div class="notice notice-info"><p>🔄 Starting update...</p></div>';

    foreach ($mappings as $product_id => $new_slug) {
        $product = wc_get_product($product_id);

        if (!$product) {
            $failed++;
            continue;
        }

        // Update the post slug
        $result = wp_update_post(array(
            'ID' => $product_id,
            'post_name' => $new_slug
        ));

        if ($result && !is_wp_error($result)) {
            $success++;
        } else {
            $failed++;
        }
    }

    echo '<div class="notice notice-success is-dismissible"><p>';
    echo '✅ <strong>Update Complete!</strong><br>';
    echo 'Successfully updated: ' . $success . ' products<br>';
    if ($failed > 0) {
        echo '❌ Failed: ' . $failed . ' products<br>';
    }
    echo '</p></div>';

    echo '<div class="notice notice-warning"><p>';
    echo '<strong>⚠️ IMPORTANT NEXT STEP:</strong><br>';
    echo 'Go to <a href="' . admin_url('options-permalink.php') . '">Settings → Permalinks</a> and click "Save Changes" to flush the permalink cache.';
    echo '</p></div>';

    // Flush rewrite rules
    flush_rewrite_rules();
}
?>
