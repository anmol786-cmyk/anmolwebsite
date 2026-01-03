'use server';

import nodemailer from 'nodemailer';
import { generateEmailTemplate, createInfoRow, createInfoBox, createCTAButton } from '@/lib/email-template';

export interface CustomCakeQuoteData {
    name: string;
    email: string;
    phone: string;
    date: string;
    occasion: string;
    flavor: string;
    weight: string;
    message?: string;
    image?: File | null;
}

export async function submitCustomCakeQuote(formData: FormData) {
    const data: CustomCakeQuoteData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        date: formData.get('date') as string,
        occasion: formData.get('occasion') as string,
        flavor: formData.get('flavor') as string,
        weight: formData.get('weight') as string,
        message: formData.get('message') as string,
        image: formData.get('image') as File,
    };

    console.log('═══════════════════════════════════════════════');
    console.log('🎂 NEW CUSTOM CAKE QUOTE REQUEST');
    console.log('═══════════════════════════════════════════════');
    console.log(`📅 Date Needed: ${data.date}`);
    console.log(`🎊 Occasion: ${data.occasion}`);
    console.log(`👤 Name: ${data.name}`);
    console.log(`📧 Email: ${data.email}`);
    console.log(`📱 Phone: ${data.phone}`);
    console.log(`🍰 Flavor: ${data.flavor}`);
    console.log(`⚖️  Weight/Guests: ${data.weight}`);
    console.log(`💬 Message: ${data.message || 'None'}`);
    if (data.image && data.image.size > 0) {
        console.log(`📎 Image Attached: ${data.image.name} (${data.image.size} bytes)`);
    }
    console.log('═══════════════════════════════════════════════');

    try {
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            const smtpPort = Number(process.env.SMTP_PORT || 587);
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                ...(smtpPort !== 465 && { requireTLS: true }),
            });

            const adminEmail = process.env.ADMIN_EMAIL || 'social@royalbr.se';
            const fromEmail = process.env.SMTP_USER;

            // Admin Email
            const adminEmailHtml = generateEmailTemplate({
                title: 'New Custom Cake Request',
                heading: '🎂 New Custom Cake Request',
                priority: 'high',
                contentSections: [
                    {
                        title: 'Cake Details',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden;">
                ${createInfoRow('Date Needed', `<strong>${data.date}</strong>`)}
                ${createInfoRow('Occasion', `<strong>${data.occasion}</strong>`)}
                ${createInfoRow('Flavor Preference', `<strong>${data.flavor}</strong>`)}
                ${createInfoRow('Est. Guests/Weight', `<strong>${data.weight}</strong>`)}
              </table>
            `
                    },
                    {
                        title: 'Customer Information',
                        content: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden;">
                ${createInfoRow('Name', `<strong>${data.name}</strong>`)}
                ${createInfoRow('Email', `<a href="mailto:${data.email}" style="color: #8B1538; text-decoration: none; font-weight: 700;">${data.email}</a>`)}
                ${createInfoRow('Phone', `<a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #8B1538; text-decoration: none; font-weight: 700;">${data.phone}</a>`)}
              </table>
            `
                    },
                    ...(data.message ? [{
                        title: '⚠️  Details & Special Requests',
                        content: createInfoBox(data.message)
                    }] : []),
                    ...(data.image && data.image.size > 0 ? [{
                        title: '📎 Reference Image',
                        content: `
              <div style="background-color: #f8f9fa; border: 1px dashed #ccc; padding: 15px; text-align: center; border-radius: 6px;">
                <p style="margin: 0; color: #666; font-size: 14px;">Image attached: <strong>${data.image.name}</strong></p>
              </div>
            `
                    }] : []),
                    {
                        title: 'Next Steps',
                        content: `
              ${createCTAButton('Call Customer Now', `tel:${data.phone.replace(/\s/g, '')}`)}
            `
                    }
                ]
            });

            // Prepare attachments
            const attachments = [];
            if (data.image && data.image.size > 0) {
                const buffer = Buffer.from(await data.image.arrayBuffer());
                attachments.push({
                    filename: data.image.name,
                    content: buffer
                });
            }

            await transporter.sendMail({
                from: `"Anmol Sweets Website" <${fromEmail}>`,
                to: adminEmail,
                subject: `🎂 NEW CAKE ORDER: ${data.occasion} - ${data.date}`,
                html: adminEmailHtml,
                attachments: attachments,
                priority: 'high',
                headers: { 'X-Priority': '1', 'Importance': 'high' }
            });

            // Customer Confirmation Email (optional, keep simple)
            // ... (Can implement similar to catering if needed)

            console.log('✅ Custom cake request emails sent successfully');
        }
    } catch (emailError) {
        console.error('⚠️  Email sending failed:', emailError);
    }

    return {
        success: true,
        message: 'Your custom cake request has been received. We will contact you shortly.',
    };
}
