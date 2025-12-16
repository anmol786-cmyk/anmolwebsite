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
}

/**
 * Generate a professional, modern HTML email template with brand styling
 */
export function generateEmailTemplate(options: EmailTemplateOptions): string {
    const { title, heading, contentSections, priority = 'normal' } = options;

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <title>${title}</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        <!-- Wrapper -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa; padding: 40px 20px;">
          <tr>
            <td align="center">

              <!-- Main Container -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">

                <!-- Header Section with Logo -->
                <tr>
                  <td style="background: linear-gradient(135deg, #8B1538 0%, #6B1028 50%, #5A0F25 100%); padding: 50px 40px; text-align: center; position: relative;">
                    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 30px; display: inline-block;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        Anmol Sweets & Restaurant
                      </h1>
                      <p style="color: #f3d7a0; margin: 12px 0 0 0; font-size: 15px; font-weight: 500; letter-spacing: 0.3px;">
                        ${brandConfig.tagline}
                      </p>
                    </div>
                    ${priority === 'high' ? `
                    <div style="position: absolute; top: 15px; right: 15px; background-color: #f3d7a0; color: #8B1538; padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                      🔔 High Priority
                    </div>
                    ` : ''}
                  </td>
                </tr>

                <!-- Heading Banner -->
                <tr>
                  <td style="background: linear-gradient(to right, #fff5e6, #fffaf0); padding: 30px 40px; border-bottom: 3px solid #f3d7a0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <h2 style="color: #8B1538; margin: 0; font-size: 26px; font-weight: 700; text-align: center; line-height: 1.3;">
                            ${heading}
                          </h2>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Sections -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    ${contentSections.map((section, index) => `
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: ${index < contentSections.length - 1 ? '35px' : '20px'};">
                        <tr>
                          <td>
                            <!-- Section Header -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 15px;">
                                  <div style="display: inline-block; background: linear-gradient(135deg, #8B1538, #6B1028); padding: 8px 16px; border-radius: 8px 8px 0 0;">
                                    <h3 style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase;">
                                      ${section.title}
                                    </h3>
                                  </div>
                                  <div style="height: 3px; background: linear-gradient(to right, #f3d7a0, transparent); margin-top: -3px;"></div>
                                </td>
                              </tr>
                            </table>

                            <!-- Section Content -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 20px 0;">
                                  ${section.content}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    `).join('')}
                  </td>
                </tr>

                <!-- Footer Section -->
                <tr>
                  <td style="background: linear-gradient(to bottom, #f9f9f9, #f5f5f5); padding: 40px 40px 30px 40px; border-top: 3px solid #f3d7a0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <!-- Contact Information -->
                      <tr>
                        <td align="center" style="padding-bottom: 25px;">
                          <h3 style="color: #8B1538; margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">
                            📞 Get in Touch
                          </h3>
                          <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                            <tr>
                              <td style="padding: 8px 15px;">
                                <div style="background-color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                  <p style="margin: 0; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Location</p>
                                  <p style="margin: 5px 0 0 0; color: #333333; font-size: 14px; font-weight: 500;">
                                    📍 ${restaurantConfig.address.street}, ${restaurantConfig.address.city}
                                  </p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 15px;">
                                <div style="background-color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                  <p style="margin: 0; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                                  <p style="margin: 5px 0 0 0;">
                                    <a href="tel:${restaurantConfig.phone.replace(/\s/g, '')}" style="color: #8B1538; font-size: 16px; font-weight: 700; text-decoration: none;">
                                      ${restaurantConfig.phone}
                                    </a>
                                  </p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 15px;">
                                <div style="background-color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                  <p style="margin: 0; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                  <p style="margin: 5px 0 0 0;">
                                    <a href="mailto:${restaurantConfig.email}" style="color: #8B1538; font-size: 14px; font-weight: 600; text-decoration: none;">
                                      ${restaurantConfig.email}
                                    </a>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Social Media Links -->
                      <tr>
                        <td align="center" style="padding: 25px 0; border-top: 1px solid #e0e0e0;">
                          <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px; font-weight: 600;">
                            Follow Us on Social Media
                          </p>
                          <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                            <tr>
                              ${brandConfig.social.facebook ? `
                                <td style="padding: 0 8px;">
                                  <a href="${brandConfig.social.facebook}" style="display: inline-block; background-color: #8B1538; color: #f3d7a0; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
                                    📘 Facebook
                                  </a>
                                </td>
                              ` : ''}
                              ${brandConfig.social.instagram ? `
                                <td style="padding: 0 8px;">
                                  <a href="${brandConfig.social.instagram}" style="display: inline-block; background-color: #8B1538; color: #f3d7a0; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
                                    📷 Instagram
                                  </a>
                                </td>
                              ` : ''}
                              ${brandConfig.social.youtube ? `
                                <td style="padding: 0 8px;">
                                  <a href="${brandConfig.social.youtube}" style="display: inline-block; background-color: #8B1538; color: #f3d7a0; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
                                    ▶️ YouTube
                                  </a>
                                </td>
                              ` : ''}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Bottom Copyright Bar -->
                <tr>
                  <td style="background: linear-gradient(135deg, #8B1538, #5A0F25); padding: 25px 40px; text-align: center;">
                    <p style="margin: 0; color: #f3d7a0; font-size: 13px; font-weight: 600;">
                      © ${new Date().getFullYear()} Anmol Sweets & Restaurant. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0 0; color: rgba(243, 215, 160, 0.7); font-size: 11px;">
                      📅 Sent on ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm'
    })} (Stockholm time)
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
 * Helper to create modern table rows for contact information
 */
export function createInfoRow(label: string, value: string): string {
    return `
    <tr>
      <td style="padding: 12px 16px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width: 35%; padding-right: 15px;">
              <span style="display: inline-block; background: linear-gradient(135deg, #8B1538, #6B1028); color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                ${label}
              </span>
            </td>
            <td style="font-size: 15px; color: #2c3e50; font-weight: 600; line-height: 1.5;">
              ${value}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

/**
 * Helper to create a modern highlighted info box
 */
export function createInfoBox(content: string): string {
    return `
    <div style="background: linear-gradient(135deg, #fff5e6, #fffaf0); border-left: 5px solid #8B1538; padding: 20px 25px; margin-top: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
      <p style="margin: 0; color: #2c3e50; font-size: 15px; line-height: 1.8; white-space: pre-wrap; font-weight: 500;">
        ${content}
      </p>
    </div>
  `;
}

/**
 * Helper to create a prominent call-to-action button
 */
export function createCTAButton(text: string, url: string): string {
    return `
    <table cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0;">
      <tr>
        <td align="center">
          <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #8B1538, #6B1028); color: #ffffff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-size: 16px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(139, 21, 56, 0.3); text-transform: uppercase;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `;
}
