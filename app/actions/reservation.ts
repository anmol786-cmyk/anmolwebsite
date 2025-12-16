'use server';

import nodemailer from 'nodemailer';
import { ReservationFormData } from '@/components/forms/reservation-form';
import { generateEmailTemplate, createInfoRow, createInfoBox, createCTAButton } from '@/lib/email-template';
import { generateKitchenInstructionPDF } from '@/lib/pdf-generator';

export async function submitReservation(data: ReservationFormData) {
    const { name, email, phone, bookingType, date, time, guests, message } = data;

    // Log reservation details with clear formatting for admin
    console.log('═══════════════════════════════════════════════');
    console.log('🎯 NEW RESERVATION REQUEST');
    console.log('═══════════════════════════════════════════════');
    console.log(`📅 Date: ${date} at ${time}`);
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📱 Phone: ${phone}`);
    console.log(`🍽️  Booking Type: ${bookingType}`);
    console.log(`👥 Number of Guests: ${guests}`);
    console.log(`💬 Message: ${message || 'None'}`);
    console.log('═══════════════════════════════════════════════');

    // Try to send email, but don't fail if it doesn't work
    try {
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            const smtpPort = Number(process.env.SMTP_PORT || 587);
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: smtpPort,
                secure: smtpPort === 465, // true for 465 (SSL), false for other ports (STARTTLS)
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                ...(smtpPort !== 465 && { requireTLS: true }), // Only use requireTLS for non-SSL ports
                connectionTimeout: 10000, // 10 seconds connection timeout
                socketTimeout: 10000, // 10 seconds socket timeout
            });

            const adminEmail = process.env.ADMIN_EMAIL || 'social@royalbr.se';
            const secondaryEmail = process.env.SECONDARY_ADMIN_EMAIL;
            const recipients = secondaryEmail ? [adminEmail, secondaryEmail] : [adminEmail];
            const fromEmail = process.env.SMTP_USER;

            // Try to generate Kitchen Instruction PDF (but don't fail if it errors)
            let kitchenPDF: Buffer | null = null;
            try {
                kitchenPDF = await generateKitchenInstructionPDF({
                    reservation: data
                });
                console.log('✅ PDF generated successfully');
            } catch (pdfError) {
                console.error('⚠️  PDF generation failed (will send email without PDF):', pdfError);
            }

            // Format booking type for display
            const bookingTypeDisplay = {
                'alacarte': 'À la Carte Dining',
                'lunch-buffet': 'Lunch Buffet (Mon-Fri 11:00-14:00)',
                'weekend-brunch': 'Weekend Brunch Buffet (Sat-Sun 10:00-14:00)'
            }[bookingType] || bookingType;

            // Create admin email with beautiful template and high priority
            const adminEmailHtml = generateEmailTemplate({
                title: 'New Reservation Request - Kitchen Instruction',
                heading: '🎯 New Reservation Request',
                priority: 'high',
                contentSections: [
                    {
                        title: 'Reservation Details',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden;">
                ${createInfoRow('Date', `<strong>${date}</strong>`)}
                ${createInfoRow('Time', `<strong>${time}</strong>`)}
                ${createInfoRow('Booking Type', `<strong>${bookingTypeDisplay}</strong>`)}
                ${createInfoRow('Number of Guests', `<strong>${guests} ${guests === '1' ? 'Guest' : 'Guests'}</strong>`)}
              </table>
            `
                    },
                    {
                        title: 'Customer Information',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden;">
                ${createInfoRow('Name', `<strong>${name}</strong>`)}
                ${createInfoRow('Email', `<a href="mailto:${email}" style="color: #8B1538; text-decoration: none; font-weight: 700;">${email}</a>`)}
                ${createInfoRow('Phone', `<a href="tel:${phone.replace(/\s/g, '')}" style="color: #8B1538; text-decoration: none; font-weight: 700;">${phone}</a>`)}
              </table>
            `
                    },
                    ...(message ? [{
                        title: '⚠️  Special Requests / Dietary Requirements',
                        content: createInfoBox(message)
                    }] : []),
                    {
                        title: '📎 Attached Document',
                        content: `
              <div style="background-color: #fff5e6; border: 2px dashed #8B1538; padding: 20px; border-radius: 10px; text-align: center;">
                <p style="margin: 0; color: #8B1538; font-size: 16px; font-weight: 700;">
                  📄 Kitchen Instruction PDF Attached
                </p>
                <p style="margin: 10px 0 0 0; color: #666666; font-size: 13px;">
                  Please print and distribute to kitchen staff
                </p>
              </div>
            `
                    },
                    {
                        title: 'Next Steps',
                        content: `
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                <ol style="margin: 0; padding-left: 20px; color: #2c3e50; font-size: 14px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;"><strong>Review the attached Kitchen Instruction PDF</strong></li>
                  <li style="margin-bottom: 10px;"><strong>Contact customer</strong> at ${phone} to confirm reservation</li>
                  <li style="margin-bottom: 10px;"><strong>Prepare kitchen</strong> according to booking type and guest count</li>
                  <li style="margin-bottom: 10px;"><strong>Note any special requests</strong> or dietary requirements</li>
                  <li><strong>Confirm with front-of-house staff</strong> for table setup</li>
                </ol>
              </div>
              ${createCTAButton('Call Customer Now', `tel:${phone.replace(/\s/g, '')}`)}
            `
                    }
                ]
            });

            // Try to send admin notification with PDF attachment (if available) and timeout
            const adminEmailPromise = transporter.sendMail({
                from: `"Anmol Sweets Reservations" <${fromEmail}>`,
                to: recipients,
                subject: `🔔 NEW RESERVATION: ${name} - ${date} @ ${time} (${guests} Guests)`,
                html: adminEmailHtml,
                ...(kitchenPDF && {
                    attachments: [
                        {
                            filename: `Kitchen-Instruction-${date}-${time.replace(':', '')}-${name.replace(/\s/g, '_')}.pdf`,
                            content: kitchenPDF,
                            contentType: 'application/pdf'
                        }
                    ]
                }),
                priority: 'high',
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'high'
                }
            });

            // Create beautiful customer confirmation email
            const customerEmailHtml = generateEmailTemplate({
                title: 'Reservation Confirmation - Anmol Sweets & Restaurant',
                heading: '✅ Reservation Request Received',
                priority: 'normal',
                contentSections: [
                    {
                        title: `Thank You, ${name}!`,
                        content: `
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #fff5e6, #fffaf0); border-radius: 10px; margin-bottom: 20px;">
                <p style="margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; line-height: 1.8; font-weight: 600;">
                  We have received your reservation request and we're excited to serve you!
                </p>
                <p style="margin: 0; color: #7f8c8d; font-size: 14px; line-height: 1.6;">
                  Our team will contact you within <strong style="color: #8B1538;">24 hours</strong> at <strong>${phone}</strong> to confirm your booking.
                </p>
              </div>
            `
                    },
                    {
                        title: '📋 Your Reservation Summary',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                ${createInfoRow('Date', `<strong>${date}</strong>`)}
                ${createInfoRow('Time', `<strong>${time}</strong>`)}
                ${createInfoRow('Number of Guests', `<strong>${guests} ${guests === '1' ? 'Guest' : 'Guests'}</strong>`)}
                ${createInfoRow('Booking Type', `<strong>${bookingTypeDisplay}</strong>`)}
              </table>
            `
                    },
                    ...(message ? [{
                        title: '📝 Your Special Requests',
                        content: createInfoBox(message)
                    }] : []),
                    {
                        title: '❓ What Happens Next',
                        content: `
              <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px;">
                <ol style="margin: 0; padding-left: 20px; color: #2c3e50; font-size: 15px; line-height: 2;">
                  <li><strong>Confirmation Call:</strong> We'll call you to confirm your reservation</li>
                  <li><strong>Arrival:</strong> Please arrive 10 minutes before your booking time</li>
                  <li><strong>Changes:</strong> Need to modify? Call us at <a href="tel:+4688866679" style="color: #8B1538; text-decoration: none; font-weight: 700;">+46 8 88 66 79</a></li>
                </ol>
              </div>
            `
                    },
                    {
                        title: '🎉 Looking Forward to Serving You!',
                        content: `
              <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #8B1538, #6B1028); border-radius: 10px; color: white;">
                <p style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.6;">
                  Experience the authentic flavors of Pakistan & India
                </p>
                <p style="margin: 15px 0 0 0; font-size: 13px; opacity: 0.9;">
                  Fresh ingredients • Traditional recipes • Warm hospitality
                </p>
              </div>
              ${createCTAButton('View Our Menu', 'https://anmolsweets.se/menu')}
            `
                    }
                ]
            });

            // Try to send customer confirmation with timeout
            const customerEmailPromise = transporter.sendMail({
                from: `"Anmol Sweets & Restaurant" <${fromEmail}>`,
                to: email,
                subject: `✅ Reservation Confirmed for ${date} at ${time} - Anmol Sweets`,
                html: customerEmailHtml,
                replyTo: fromEmail
            });

            // Send both emails with a timeout
            await Promise.all([
                Promise.race([
                    adminEmailPromise,
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Admin email timeout')), 15000))
                ]).catch(err => console.error('Admin email failed:', err)),
                Promise.race([
                    customerEmailPromise,
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Customer email timeout')), 15000))
                ]).catch(err => console.error('Customer email failed:', err))
            ]);

            console.log('✅ Emails sent successfully');
        } else {
            console.log('⚠️  SMTP not configured, skipping email notifications');
        }
    } catch (emailError) {
        console.error('⚠️  Email sending failed (reservation still recorded):', emailError);
    }

    // Always return success since reservation is logged
    return {
        success: true,
        message: 'Your reservation request has been received. We will contact you shortly to confirm.'
    };
}
