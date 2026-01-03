import PDFDocument from 'pdfkit';
import { CateringQuoteData } from '@/app/actions/catering';

/**
 * Generate a professional kitchen instruction PDF for catering orders
 * Modern, clean, and printer-friendly design
 */
export async function generateCateringInstructionPDF(catering: CateringQuoteData): Promise<Buffer> {
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
                },
                bufferPages: true
            });

            const buffers: Buffer[] = [];

            // Collect PDF data
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });
            doc.on('error', reject);

            // Styling Constants
            const primaryColor = '#8B1538';
            const darkText = '#333333';
            const lightText = '#666666';
            const borderColor = '#EEEEEE';

            // --- Header ---
            doc
                .fontSize(20)
                .fillColor(primaryColor)
                .font('Helvetica-Bold')
                .text('ANMOL SWEETS & RESTAURANT', 50, 50);

            doc
                .fontSize(10)
                .fillColor(lightText)
                .font('Helvetica')
                .text('KITCHEN INSTRUCTION SHEET', 50, 75);

            // Order ID / Date on right
            doc
                .fontSize(10)
                .fillColor(darkText)
                .text(`Date: ${new Date().toLocaleDateString()}`, 400, 50, { align: 'right' });

            doc
                .text(`Order REF: CAT-${new Date(catering.submittedAt).getTime().toString().slice(-6)}`, 400, 65, { align: 'right' });

            // Divider
            doc.moveTo(50, 95).lineTo(545, 95).strokeColor(borderColor).stroke();

            // --- Event Details Grid ---
            let y = 115;

            doc
                .fontSize(14)
                .fillColor(darkText)
                .font('Helvetica-Bold')
                .text('EVENT DETAILS', 50, y);

            y += 25;

            // Row 1
            drawField(doc, 'Customer', catering.name, 50, y);
            drawField(doc, 'Event Date', catering.eventDate, 200, y);
            drawField(doc, 'Guests', catering.guestCount, 350, y);
            y += 40;

            // Row 2
            drawField(doc, 'Event Type', catering.eventType, 50, y);
            drawField(doc, 'Phone', catering.phone, 200, y);
            drawField(doc, 'Email', catering.email, 350, y);
            y += 50; // Extra spacing

            // --- Menu Section ---
            doc
                .fontSize(14)
                .fillColor(darkText)
                .font('Helvetica-Bold')
                .text('MENU REQUIREMENTS', 50, y);

            y += 25;

            // Header for menu table
            doc.rect(50, y, 495, 25).fill(primaryColor);
            doc.fillColor('#FFFFFF').fontSize(10).text('ITEM NAME', 65, y + 8);
            doc.text('CHECK', 500, y + 8);
            y += 25;

            // Content
            let hasItems = false;
            Object.entries(catering.selectedMenu).forEach(([category, items]) => {
                if (items.length > 0) {
                    hasItems = true;
                    // Category Header
                    if (y > 700) { doc.addPage(); y = 50; }

                    doc.rect(50, y, 495, 20).fill('#F9F9F9');
                    doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text(category.toUpperCase(), 60, y + 5);
                    y += 20;

                    // Items
                    items.forEach(item => {
                        if (y > 720) { doc.addPage(); y = 50; }

                        doc.rect(50, y, 495, 30).fillAndStroke('#FFFFFF', borderColor);

                        doc
                            .fillColor(darkText)
                            .fontSize(12)
                            .font('Helvetica')
                            .text(item, 70, y + 10);

                        // Checkbox square
                        doc.rect(500, y + 8, 14, 14).stroke(lightText);

                        y += 30;
                    });
                }
            });

            if (!hasItems) {
                doc.fontSize(12).fillColor(lightText).font('Helvetica-Oblique').text('No menu items selected.', 60, y + 10);
                y += 30;
            }

            y += 20;

            // --- Special Instructions ---
            if (catering.message) {
                if (y > 650) { doc.addPage(); y = 50; }

                doc
                    .fontSize(14)
                    .fillColor(darkText)
                    .font('Helvetica-Bold')
                    .text('NOTES / SPECIAL REQUESTS', 50, y);
                y += 20;

                doc
                    .rect(50, y, 495, 80)
                    .stroke(primaryColor);

                doc
                    .fontSize(11)
                    .fillColor(darkText)
                    .font('Helvetica')
                    .text(catering.message, 60, y + 10, { width: 475 });

                y += 100;
            }

            // --- Kitchen Checks ---
            if (y > 650) { doc.addPage(); y = 50; }

            y += 20;
            doc.fontSize(14).fillColor(darkText).font('Helvetica-Bold').text('KITCHEN CHECKS', 50, y);
            y += 25;

            const checks = ['Ingredients Checked', 'Prep Started', 'Quality Check', 'Ready for Dispatch'];
            checks.forEach(check => {
                doc.rect(50, y, 15, 15).stroke(darkText);
                doc.fontSize(11).fillColor(darkText).font('Helvetica').text(check, 75, y + 2);
                y += 25;
            });

            // --- Footer ---
            const bottomY = doc.page.height - 50;
            doc
                .fontSize(9)
                .fillColor(lightText)
                .font('Helvetica')
                .text('Anmol Sweets & Restaurant - Internal Kitchen Document', 50, bottomY, { align: 'center' });


            // Finalize
            doc.end();

        } catch (error) {
            reject(error);
        }
    });
}

function drawField(doc: PDFKit.PDFDocument, label: string, value: string, x: number, y: number) {
    doc.fontSize(9).fillColor('#666666').font('Helvetica').text(label.toUpperCase(), x, y);
    doc.fontSize(12).fillColor('#333333').font('Helvetica-Bold').text(value, x, y + 15);
}

