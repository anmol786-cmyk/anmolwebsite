'use server';

import { WC_API_CONFIG } from '@/lib/woocommerce/config';
import { RegisterData, LoginCredentials } from '@/lib/auth';
import { getCustomerOrders } from '@/lib/woocommerce/orders';

export async function registerUserAction(data: RegisterData) {
    const baseUrl = WC_API_CONFIG.baseUrl;
    // Use server-side keys
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
        console.error('Missing WC_CONSUMER_KEY or WC_CONSUMER_SECRET');
        return { success: false, error: 'Server configuration error: Missing API keys' };
    }

    try {
        const response = await fetch(`${baseUrl}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('WooCommerce Registration Error:', responseData);
            return {
                success: false,
                error: responseData.message || 'Registration failed',
                code: responseData.code
            };
        }

        return { success: true, data: responseData };
    } catch (error: any) {
        console.error('Registration error:', error);
        return { success: false, error: error.message || 'An unexpected error occurred' };
    }
}

export async function loginUserAction(credentials: LoginCredentials) {
    console.log('Attempting login for:', credentials.username);

    // Try Simple JWT Login endpoint first (newer plugin)
    const simpleJwtUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth`;
    console.log('Trying Simple JWT Login URL:', simpleJwtUrl);

    try {
        // Simple JWT Login - configured to use email-based login
        // Send as email parameter (based on WordPress plugin config)
        const response = await fetch(simpleJwtUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.username, // username field can contain email
                password: credentials.password,
                AUTH_KEY: 'AnmolStockholmAuthKeYs', // Your JWT Auth Code
            }),
        });

        console.log('Login Response Status:', response.status);
        const data = await response.json();
        console.log('Login Response Data:', data);

        if (!response.ok) {
            console.error('Login failed with status:', response.status, data);
            return { success: false, error: data.message || 'Login failed' };
        }

        // Simple JWT Login returns data in a different format
        // Transform it to match our expected format
        const transformedData = {
            token: data.data?.jwt || data.jwt,
            user_email: data.data?.user?.user_email || data.user?.user_email,
            user_nicename: data.data?.user?.user_nicename || data.user?.user_nicename,
            user_display_name: data.data?.user?.user_display_name || data.user?.user_display_name,
        };

        return { success: true, data: transformedData };
    } catch (error: any) {
        console.error('Login error:', error);
        return { success: false, error: error.message || 'Login failed' };
    }
}

export async function getCurrentUserAction(token: string, userEmail?: string) {
    const baseUrl = WC_API_CONFIG.baseUrl;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    console.log('Getting current user with token:', token ? 'Token exists' : 'No token');
    console.log('User email from JWT:', userEmail);

    try {
        // If we don't have the email, try to decode it from the JWT token
        let email = userEmail;

        if (!email && token) {
            // JWT tokens have 3 parts separated by dots: header.payload.signature
            // We can decode the payload (it's base64 encoded but not encrypted)
            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
                    email = payload.data?.user?.user_email || payload.email;
                    console.log('Decoded email from JWT:', email);
                }
            } catch (decodeError) {
                console.error('Failed to decode JWT:', decodeError);
            }
        }

        if (!email) {
            console.error('No email found in token or parameters');
            return { success: false, error: 'Unable to determine user email' };
        }

        // Fetch WC customer details using email
        if (consumerKey && consumerSecret) {
            const customerUrl = `${baseUrl}/customers?email=${email}`;
            console.log('Fetching WC customer from:', customerUrl);

            const customerResponse = await fetch(
                customerUrl,
                {
                    headers: {
                        'Authorization': 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
                    },
                }
            );

            console.log('WC Customer Response Status:', customerResponse.status);

            if (customerResponse.ok) {
                const customers = await customerResponse.json();
                if (customers.length > 0) {
                    console.log('WC Customer found:', customers[0].id);
                    return { success: true, data: customers[0] };
                } else {
                    console.log('No WC customer found with email:', email);
                }
            } else {
                const errorText = await customerResponse.text();
                console.error('Failed to fetch WC customer:', errorText);
            }
        } else {
            console.warn('Missing Consumer Key/Secret, skipping WC customer fetch');
        }

        // No WooCommerce customer found - create one automatically
        console.log('No WooCommerce customer found, creating one for:', email);

        // Extract name from email (before @) for initial customer data
        const emailUsername = email.split('@')[0];
        const nameParts = emailUsername.split(/[._-]/);
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Try to create a WooCommerce customer
        if (consumerKey && consumerSecret) {
            try {
                const createCustomerUrl = `${baseUrl}/customers`;
                const customerData = {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    username: emailUsername,
                };

                console.log('Creating WooCommerce customer:', customerData);

                const createResponse = await fetch(createCustomerUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
                    },
                    body: JSON.stringify(customerData),
                });

                if (createResponse.ok) {
                    const newCustomer = await createResponse.json();
                    console.log('WooCommerce customer created successfully:', newCustomer.id);
                    return { success: true, data: newCustomer };
                } else {
                    const errorData = await createResponse.json();
                    console.error('Failed to create WooCommerce customer:', errorData);

                    // If customer already exists (maybe created between checks), try fetching again
                    if (errorData.code === 'registration-error-email-exists') {
                        const retryCustomerUrl = `${baseUrl}/customers?email=${email}`;
                        const retryResponse = await fetch(retryCustomerUrl, {
                            headers: {
                                'Authorization': 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
                            },
                        });

                        if (retryResponse.ok) {
                            const customers = await retryResponse.json();
                            if (customers.length > 0) {
                                console.log('Found existing customer on retry:', customers[0].id);
                                return { success: true, data: customers[0] };
                            }
                        }
                    }
                }
            } catch (createError) {
                console.error('Error creating WooCommerce customer:', createError);
            }
        }

        // Fallback: Return basic user object if customer creation failed
        console.warn('Using fallback user object (no WooCommerce customer)');
        return {
            success: true,
            data: {
                id: 0, // No ID available
                email: email,
                first_name: firstName,
                last_name: lastName,
                username: emailUsername,
                role: 'customer',
                avatar_url: '',
                billing: {},
                shipping: {},
            }
        };

    } catch (error: any) {
        console.error('Get user error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get orders for the current logged-in customer
 */
export async function getCustomerOrdersAction(customerId: number, params?: {
    per_page?: number;
    page?: number;
    status?: string;
}) {
    try {
        const orders = await getCustomerOrders(customerId, params);
        return { success: true, data: orders };
    } catch (error: any) {
        console.error('Get customer orders error:', error);
        return { success: false, error: error.message || 'Failed to fetch orders' };
    }
}

/**
 * Update customer data in WooCommerce
 */
export async function updateCustomerAction(customerId: number, data: any) {
    const baseUrl = WC_API_CONFIG.baseUrl;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
        return { success: false, error: 'Server configuration error: Missing API keys' };
    }

    try {
        const response = await fetch(`${baseUrl}/customers/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('WooCommerce Update Customer Error:', responseData);
            return {
                success: false,
                error: responseData.message || 'Failed to update customer',
            };
        }

        return { success: true, data: responseData };
    } catch (error: any) {
        console.error('Update customer error:', error);
        return { success: false, error: error.message || 'Failed to update customer' };
    }
}
