import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { ReservationFormData } from '@/components/forms/reservation-form';

interface PDFGeneratorOptions {
    reservation: ReservationFormData;
}

/**
 * Generate a professional kitchen instruction PDF for reservations
 */
export async function generateKitchenInstructionPDF(options: PDFGeneratorOptions): Promise<Buffer> {
    const { reservation } = options;

    return new Promise((resolve, reject) => {
        try {
            // Create a new PDF document
            const doc = new PDFDocument({
                size: 'A4',
                margins: {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50
                }
            });

            const buffers: Buffer[] = [];

            // Collect PDF data
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });
            doc.on('error', reject);

            // Define colors
            const primaryColor = '#8B1538';
            const goldColor = '#f3d7a0';
            const darkGray = '#2c3e50';
            const lightGray = '#95a5a6';

            // Page header - Restaurant branding
            doc
                .rect(0, 0, doc.page.width, 120)
                .fillAndStroke(primaryColor, primaryColor);

            doc
                .fontSize(28)
                .fillColor('#ffffff')
                .font('Helvetica-Bold')
                .text('ANMOL SWEETS & RESTAURANT', 50, 30, { align: 'center' });

            doc
                .fontSize(12)
                .fillColor(goldColor)
                .font('Helvetica')
                .text('Authentic Pakistani & Indian Cuisine', 50, 65, { align: 'center' });

            // Document title banner
            doc
                .rect(0, 120, doc.page.width, 60)
                .fill(goldColor);

            doc
                .fontSize(24)
                .fillColor(primaryColor)
                .font('Helvetica-Bold')
                .text('🍽️  KITCHEN INSTRUCTION', 50, 140, { align: 'center' });

            // Reset position after header
            let currentY = 200;

            // Reservation ID and Priority
            doc
                .fontSize(10)
                .fillColor(lightGray)
                .font('Helvetica')
                .text(`Reservation ID: RES-${new Date().getTime().toString().slice(-8)}`, 50, currentY);

            doc
                .fontSize(10)
                .fillColor('#ff4444')
                .font('Helvetica-Bold')
                .text('⚠️ HIGH PRIORITY', doc.page.width - 150, currentY, { width: 100, align: 'right' });

            currentY += 40;

            // Section: Reservation Details
            drawSectionHeader(doc, '📅 RESERVATION DETAILS', currentY, primaryColor);
            currentY += 35;

            const reservationDetails = [
                { label: 'Customer Name', value: reservation.name, icon: '👤' },
                { label: 'Date', value: reservation.date, icon: '📅' },
                { label: 'Time', value: reservation.time, icon: '🕐' },
                { label: 'Number of Guests', value: reservation.guests, icon: '👥' },
                { label: 'Booking Type', value: formatBookingType(reservation.bookingType), icon: '🍽️' },
            ];

            reservationDetails.forEach((detail, index) => {
                drawDetailRow(doc, detail.icon, detail.label, detail.value, currentY, index % 2 === 0);
                currentY += 35;
            });

            currentY += 10;

            // Section: Contact Information
            drawSectionHeader(doc, '📞 CONTACT INFORMATION', currentY, primaryColor);
            currentY += 35;

            const contactDetails = [
                { label: 'Phone Number', value: reservation.phone, icon: '📱' },
                { label: 'Email Address', value: reservation.email, icon: '📧' },
            ];

            contactDetails.forEach((detail, index) => {
                drawDetailRow(doc, detail.icon, detail.label, detail.value, currentY, index % 2 === 0);
                currentY += 35;
            });

            // Special Instructions (if any)
            if (reservation.message && reservation.message.trim()) {
                currentY += 10;
                drawSectionHeader(doc, '⚠️  SPECIAL INSTRUCTIONS', currentY, '#ff4444');
                currentY += 35;

                doc
                    .rect(50, currentY, doc.page.width - 100, 80)
                    .fillAndStroke('#fff5e6', goldColor);

                doc
                    .fontSize(12)
                    .fillColor(darkGray)
                    .font('Helvetica-Bold')
                    .text(reservation.message, 65, currentY + 15, {
                        width: doc.page.width - 130,
                        align: 'left',
                        lineGap: 5
                    });

                currentY += 90;
            }

            // Kitchen Preparation Checklist
            currentY += 10;
            drawSectionHeader(doc, '✓ KITCHEN PREPARATION CHECKLIST', currentY, primaryColor);
            currentY += 35;

            const checklistItems = [
                'Verify reservation time and guest count',
                'Prepare table setup for booking type',
                'Review any dietary restrictions or allergies',
                'Ensure all ingredients are fresh and available',
                'Coordinate with front-of-house staff',
                'Set up special decorations if mentioned in requests',
            ];

            checklistItems.forEach((item, index) => {
                doc
                    .rect(50, currentY + (index * 28), 15, 15)
                    .stroke(primaryColor);

                doc
                    .fontSize(11)
                    .fillColor(darkGray)
                    .font('Helvetica')
                    .text(item, 75, currentY + (index * 28) + 2, {
                        width: doc.page.width - 125
                    });
            });

            currentY += (checklistItems.length * 28) + 20;

            // Footer section
            const footerY = doc.page.height - 80;

            doc
                .rect(0, footerY, doc.page.width, 80)
                .fill('#f8f9fa');

            doc
                .fontSize(10)
                .fillColor(lightGray)
                .font('Helvetica')
                .text('Generated on ' + new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Stockholm'
                }) + ' (Stockholm time)', 50, footerY + 15, { align: 'center' });

            doc
                .fontSize(9)
                .fillColor(primaryColor)
                .font('Helvetica-Bold')
                .text('Anmol Sweets & Restaurant | Fagerstagatan 13, 163 53 Spånga | +46 8 88 66 79',
                    50, footerY + 40, { align: 'center' });

            // Finalize the PDF
            doc.end();

        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Helper function to draw section headers
 */
function drawSectionHeader(doc: PDFKit.PDFDocument, title: string, y: number, color: string) {
    doc
        .rect(50, y, doc.page.width - 100, 25)
        .fillAndStroke(color, color);

    doc
        .fontSize(14)
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .text(title, 60, y + 6);
}

/**
 * Helper function to draw detail rows with alternating backgrounds
 */
function drawDetailRow(
    doc: PDFKit.PDFDocument,
    icon: string,
    label: string,
    value: string,
    y: number,
    alternate: boolean
) {
    if (alternate) {
        doc
            .rect(50, y, doc.page.width - 100, 30)
            .fill('#f8f9fa');
    }

    doc
        .fontSize(18)
        .fillColor('#2c3e50')
        .font('Helvetica')
        .text(icon, 60, y + 5);

    doc
        .fontSize(11)
        .fillColor('#7f8c8d')
        .font('Helvetica-Bold')
        .text(label, 90, y + 8);

    doc
        .fontSize(12)
        .fillColor('#2c3e50')
        .font('Helvetica-Bold')
        .text(value, 250, y + 8);
}

/**
 * Format booking type for display
 */
function formatBookingType(type: string): string {
    const types: { [key: string]: string } = {
        'alacarte': 'À la Carte Dining',
        'lunch-buffet': 'Lunch Buffet',
        'weekend-brunch': 'Weekend Brunch Buffet',
    };
    return types[type] || type;
}
