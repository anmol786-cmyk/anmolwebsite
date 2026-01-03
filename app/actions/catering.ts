'use server';

import nodemailer from 'nodemailer';
import { generateEmailTemplate, createInfoRow, createInfoBox, createCTAButton } from '@/lib/email-template';
import { generateCateringInstructionPDF } from '@/lib/pdf-generator-catering';

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

      // Try to generate Kitchen Instruction PDF (but don't fail if it errors)
      let cateringPDF: Buffer | null = null;
      try {
        cateringPDF = await generateCateringInstructionPDF(data);
        console.log('✅ PDF generated successfully');
      } catch (pdfError) {
        console.error('⚠️  PDF generation failed (will send email without PDF):', pdfError);
      }

      // Format selected menu for email with better styling
      const menuHtml = Object.entries(data.selectedMenu)
        .filter(([_, items]) => items.length > 0)
        .map(([category, items]) => `
          <div style="margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #8B1538; border-radius: 6px;">
            <strong style="color: #8B1538; text-transform: uppercase; font-size: 13px; letter-spacing: 0.5px;">${category}:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #2c3e50;">
              ${items.map(item => `<li style="margin: 5px 0; font-size: 14px;">${item}</li>`).join('')}
            </ul>
          </div>
        `)
        .join('');

      // Create admin email with beautiful template and high priority
      const adminEmailHtml = generateEmailTemplate({
        title: 'New Catering Order - Kitchen Instruction',
        heading: '🎉 New Catering Quote Request',
        priority: 'high',
        contentSections: [
          {
            title: 'Event Details',
            content: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden;">
                ${createInfoRow('Event Type', `<strong>${data.eventType}</strong>`)}
                ${createInfoRow('Event Date', `<strong>${data.eventDate}</strong>`)}
                ${createInfoRow('Number of Guests', `<strong>${data.guestCount} Guests</strong>`)}
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
          {
            title: '🍽️  Menu Selection',
            content: menuHtml || '<p style="color: #666666; font-style: italic;">No menu items selected</p>'
          },
          ...(data.message ? [{
            title: '⚠️  Special Requests / Dietary Requirements',
            content: createInfoBox(data.message)
          }] : []),
          // Only include "Attached Document" section if PDF was generated successfully
          ...(cateringPDF ? [{
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
          }] : []),
          {
            title: 'Next Steps',
            content: `
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                <ol style="margin: 0; padding-left: 20px; color: #2c3e50; font-size: 14px; line-height: 1.8;">
                  ${cateringPDF ? '<li style="margin-bottom: 10px;"><strong>Review the attached Kitchen Instruction PDF</strong></li>' : ''}
                  <li style="margin-bottom: 10px;"><strong>Contact customer</strong> at ${data.phone} to discuss details</li>
                  <li style="margin-bottom: 10px;"><strong>Verify menu items</strong> and availability for event date</li>
                  <li style="margin-bottom: 10px;"><strong>Prepare quote</strong> based on guest count and menu</li>
                  <li><strong>Send formal quote</strong> to customer via email</li>
                </ol>
              </div>
              ${createCTAButton('Call Customer Now', `tel:${data.phone.replace(/\s/g, '')}`)}
            `
          }
        ]
      });

      // Send email to admin with PDF attachment (if available)
      await transporter.sendMail({
        from: `"Anmol Sweets Catering" <${fromEmail}>`,
        to: recipients,
        subject: `🔔 NEW CATERING ORDER: ${data.eventType} - ${data.guestCount} guests on ${data.eventDate}`,
        html: adminEmailHtml,
        ...(cateringPDF && {
          attachments: [
            {
              filename: `Catering-Order-${data.eventDate.replace(/\//g, '-')}-${data.name.replace(/\s/g, '_')}.pdf`,
              content: cateringPDF,
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
        subject: `✅ Catering Quote Request for ${data.eventDate} - Anmol Sweets`,
        html: customerEmailHtml,
        replyTo: fromEmail
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
