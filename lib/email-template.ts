import { brandConfig } from '@/config/brand.config';
import { restaurantConfig } from '@/config/restaurant.config';

interface EmailTemplateOptions {
    title: string;
    heading: string;
    contentSections: {
        title: string;
        content: string;
    }[];
    priority?: 'high' | 'normal';
    heroImage?: string;
}

/**
 * Generate a professional, elegant HTML email template
 */
export function generateEmailTemplate(options: EmailTemplateOptions): string {
    const { title, heading, contentSections, priority = 'normal', heroImage } = options;

    // Colors
    const primaryColor = '#8B1538';
    const textDark = '#111111';
    const textLight = '#555555';
    const bgBody = '#F9F9F9';
    const bgCard = '#FFFFFF';

    // Images
    const headerImage = 'https://anmolsweets.se/wp-content/uploads/2025/12/Restaurant-front-side.jpg';
    const logoUrl = 'https://anmolsweets.se/wp-content/uploads/2021/01/logo.png';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${bgBody}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: ${textDark};">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${bgBody};">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    
                    <!-- Main Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: ${bgCard}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        
                        <!-- Header with Background Image & Overlay -->
                        <!-- Fallback background-color provided. background-image applied to TD using inline styles. -->
                        <tr>
                            <td align="center" style="background-color: #222222; background-image: url('https://anmolsweets.se/wp-content/uploads/2025/12/Restaurant-front-side.jpg'); background-size: cover; background-position: center;">
                                <!--[if gte mso 9]>
                                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:240px;">
                                <v:fill type="tile" src="https://anmolsweets.se/wp-content/uploads/2025/12/Restaurant-front-side.jpg" color="#222222" />
                                <v:textbox inset="0,0,0,0">
                                <![endif]-->
                                <div style="background: rgba(0, 0, 0, 0.6); width: 100%; padding: 60px 20px;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td align="center">
                                                <img src="${logoUrl}" alt="Anmol Sweets" width="60" style="display: block; width: 60px; height: auto; margin-bottom: 15px;" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                                                    Anmol Sweets & Restaurant
                                                </h1>
                                                <p style="margin: 8px 0 0 0; color: #E0E0E0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
                                                    Authentic Pakistani Cuisine
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!--[if gte mso 9]>
                                </v:textbox>
                                </v:rect>
                                <![endif]-->
                            </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 30px 40px;">
                                
                                <!-- Heading -->
                                <h1 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 700; color: ${textDark}; letter-spacing: -0.3px;">
                                    ${heading}
                                </h1>

                                ${priority === 'high' ? `
                                <div style="margin-bottom: 20px;">
                                    <span style="background-color: #FFF0F0; color: ${primaryColor}; padding: 4px 10px; border: 1px solid ${primaryColor}40; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                                        High Priority
                                    </span>
                                </div>
                                ` : ''}

                                <!-- Sections -->
                                ${contentSections.map((section, index) => `
                                    <div style="margin-bottom: 25px;">
                                        ${section.title ? `
                                            <h2 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; color: ${textLight}; letter-spacing: 0.5px;">
                                                ${section.title}
                                            </h2>
                                        ` : ''}
                                        
                                        <div style="font-size: 14px; line-height: 1.6; color: ${textDark};">
                                            ${section.content}
                                        </div>
                                    </div>
                                    ${index < contentSections.length - 1 ? '<div style="height: 1px; background-color: #EEEEEE; margin: 25px 0;"></div>' : ''}
                                `).join('')}

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #FAFAFA; padding: 30px 40px; border-top: 1px solid #EEEEEE; font-size: 12px; color: ${textLight}; line-height: 1.6;">
                                <p style="margin: 0 0 10px 0; font-weight: 600; color: ${textDark};">
                                    Thank you for choosing Anmol Sweets & Restaurant
                                </p>
                                <p style="margin: 0 0 5px 0;">
                                    Stockholm’s #1 destination for authentic Pakistani and Indian food.
                                </p>
                                <p style="margin: 0 0 5px 0; font-weight: 500; color: ${primaryColor};">
                                    Catering | Sweets | Delivery all over Sweden
                                </p>
                                <p style="margin: 0 0 15px 0;">
                                    Dine-in | Takeaway
                                </p>
                                
                                <div style="margin: 15px 0; height: 1px; background-color: #EEEEEE;"></div>
                                
                                <p style="margin: 0 0 5px 0;">Fagerstagatan 13, Spånga, Sweden</p>
                                <p style="margin: 0 0 5px 0;">
                                    <a href="tel:+468886679" style="color: ${textLight}; text-decoration: none;">+46 8 88 66 79</a>
                                </p>
                                <p style="margin: 0 0 15px 0;">
                                    <a href="https://www.anmolsweets.se" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">www.anmolsweets.se</a>
                                </p>

                                <p style="margin: 0; font-size: 11px; color: #999999;">
                                    © ${new Date().getFullYear()} Anmol Sweets & Restaurant | All Rights Reserved
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

/**
 * Compact Info Row
 */
export function createInfoRow(label: string, value: string): string {
    return `
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; border-bottom: 1px solid #F5F5F5; padding-bottom: 4px;">
        <span style="font-size: 13px; font-weight: 600; color: #666666;">${label}</span>
        <span style="font-size: 13px; color: #111111; text-align: right;">${value}</span>
    </div>
    `;
}

/**
 * Clean Info Box (Notes)
 */
export function createInfoBox(content: string): string {
    return `
    <div style="background-color: #F8F8F8; padding: 12px; border-radius: 4px; font-size: 13px; color: #444444; font-style: italic; border-left: 3px solid #8B1538;">
        ${content}
    </div>
    `;
}

/**
 * Compact Button
 */
export function createCTAButton(text: string, url: string): string {
    return `
    <div style="margin: 20px 0;">
        <a href="${url}" style="display: inline-block; background-color: #8B1538; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 600; text-transform: uppercase;">
            ${text}
        </a>
    </div>
    `;
}
