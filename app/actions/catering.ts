'use server';

import nodemailer from 'nodemailer';
import { generateEmailTemplate, createInfoRow, createInfoBox } from '@/lib/email-template';

export interface CateringQuoteData {
    name: string;
    email: string;
    phone: string;
    eventDate: string;
    eventType: string;
    guestCount: string;
    selectedMenu: Record<string, string[]>;
    message?: string;
    submittedAt: string;
}

export async function submitCateringQuote(data: CateringQuoteData) {
    // Log quote details with clear formatting for admin
    console.log('═══════════════════════════════════════════════');
    console.log('🎉 NEW CATERING QUOTE REQUEST');
    console.log('═══════════════════════════════════════════════');
    console.log(`📅 Event Date: ${data.eventDate}`);
    console.log(`🎊 Event Type: ${data.eventType}`);
    console.log(`👥 Guest Count: ${data.guestCount}`);
    console.log(`👤 Name: ${data.name}`);
    console.log(`📧 Email: ${data.email}`);
    console.log(`📱 Phone: ${data.phone}`);
    console.log(`💬 Message: ${data.message || 'None'}`);
    console.log('🍽️  Selected Menu Items:');
    Object.entries(data.selectedMenu).forEach(([category, items]) => {
        if (items.length > 0) {
            console.log(`   ${category}: ${items.join(', ')}`);
        }
    });
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
            });

            const adminEmail = process.env.ADMIN_EMAIL || 'social@royalbr.se';
            const secondaryEmail = process.env.SECONDARY_ADMIN_EMAIL;
            const recipients = secondaryEmail ? [adminEmail, secondaryEmail] : [adminEmail];
            const fromEmail = process.env.SMTP_USER;

            // Format selected menu for email with better styling
            const menuHtml = Object.entries(data.selectedMenu)
                .filter(([_, items]) => items.length > 0)
                .map(([category, items]) => `
          <div style="margin-bottom: 12px;">
            <strong style="color: #8B1538; text-transform: capitalize;">${category}:</strong>
            <span style="color: #333333;"> ${items.join(', ')}</span>
          </div>
        `)
                .join('');

            // Create admin email with beautiful template
            const adminEmailHtml = generateEmailTemplate({
                title: 'New Catering Quote Request',
                heading: '🎉 New Catering Quote Request',
                contentSections: [
                    {
                        title: 'Event Details',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0">
                ${createInfoRow('Event Type', data.eventType)}
                ${createInfoRow('Event Date', data.eventDate)}
                ${createInfoRow('Number of Guests', data.guestCount)}
              </table>
            `
                    },
                    {
                        title: 'Customer Information',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0">
                ${createInfoRow('Name', data.name)}
                ${createInfoRow('Email', `<a href="mailto:${data.email}" style="color: #8B1538; text-decoration: none;">${data.email}</a>`)}
                ${createInfoRow('Phone', `<a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #8B1538; text-decoration: none;">${data.phone}</a>`)}
              </table>
            `
                    },
                    {
                        title: 'Menu Selection',
                        content: menuHtml || '<p style="color: #666666; font-style: italic;">No menu items selected</p>'
                    },
                    ...(data.message ? [{
                        title: 'Special Requests',
                        content: createInfoBox(data.message)
                    }] : [])
                ]
            });

            // Send email to admin (and secondary admin)
            await transporter.sendMail({
                from: `"Anmol Sweets Catering" <${fromEmail}>`,
                to: recipients,
                subject: `New Catering Quote: ${data.eventType} - ${data.guestCount} guests on ${data.eventDate}`,
                html: adminEmailHtml,
            });

            // Create customer confirmation email  
            const customerEmailHtml = generateEmailTemplate({
                title: 'Catering Quote Request Received',
                heading: '✅ Catering Quote Request Received',
                contentSections: [
                    {
                        title: `Thank You, ${data.name}!`,
                        content: `
              <p style="margin: 0 0 15px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                We have received your catering quote request for <strong>${data.guestCount} guests</strong> on <strong>${data.eventDate}</strong>.
              </p>
              <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                Our catering team will review your requirements and get back to you within 24 hours with a detailed quote and menu options.
              </p>
            `
                    },
                    {
                        title: 'Your Event Details',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0">
                ${createInfoRow('Event Type', data.eventType)}
                ${createInfoRow('Event Date', data.eventDate)}
                ${createInfoRow('Number of Guests', data.guestCount)}
              </table>
            `
                    },
                    {
                        title: 'Need Immediate Assistance?',
                        content: `
              <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                If you have any immediate questions, please call us at <a href="tel:+4688866679" style="color: #8B1538; text-decoration: none; font-weight: 600;">+46 8 88 66 79</a>
              </p>
            `
                    }
                ]
            });

            // Send confirmation email to customer
            await transporter.sendMail({
                from: `"Anmol Sweets Catering" <${fromEmail}>`,
                to: data.email,
                subject: 'Catering Quote Request Received - Anmol Sweets',
                html: customerEmailHtml,
            });

            console.log('✅ Catering quote emails sent successfully');
        }
    } catch (emailError) {
        console.error('⚠️  Email sending failed (quote still recorded):', emailError);
    }

    // Always return success since quote is logged
    return {
        success: true,
        message: 'Your catering quote request has been received. We will contact you within 24 hours with a detailed proposal.',
    };
}
