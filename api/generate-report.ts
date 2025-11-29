import { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';

// Generates a simple PDF report from provided form + analysis JSON.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { form, analysis } = req.body || {};
    if (!form || !analysis) {
      return res.status(400).json({ error: 'form and analysis are required' });
    }

    // Create PDF
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const chunks: any[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${(form.businessName || 'report').replace(/\s+/g, '_')}.pdf"`);
      res.send(result);
    });

    // Header
    doc.fontSize(20).fillColor('#0f172a').text(`${form.businessName || 'Business'} — Local SEO & AIO Report`, { align: 'left' });
    doc.moveDown();

    doc.fontSize(12).fillColor('#0b1220');
    doc.text(`Website: ${form.website || '—'}`);
    doc.text(`Google Profile: ${form.googleProfile || '—'}`);
    doc.text(`Service Area: ${form.serviceArea || '—'}`);
    doc.text(`Primary Keywords: ${form.primaryKeywords || '—'}`);
    doc.moveDown();

    doc.fontSize(14).fillColor('#111827').text('Analysis Summary', { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(11).fillColor('#1f2937');
    doc.text(`Title: ${analysis.title || '—'}`);
    doc.text(`Meta description: ${analysis.description || '—'}`);
    doc.text(`Internal links found: ${analysis.internalLinks}`);
    doc.text(`External links found: ${analysis.externalLinks}`);
    doc.text(`Estimated local searches (sample): ${analysis.estimated_searches}`);
    doc.text(`1st-page visibility (sample): ${analysis.first_page_visibility}`);
    doc.moveDown();

    doc.fontSize(12).fillColor('#0b1220').text('Notes & Next Steps', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#1f2937');
    doc.text(analysis.notes || 'No notes');
    doc.moveDown();

    doc.text('Suggested actions:', { bold: true });
    doc.list([
      'Claim & verify Google Business Profile and ensure NAP is consistent',
      'Add structured FAQ and service schema to website',
      'Publish local content and optimized blog posts for target keywords',
      'Build consistent citations across high-authority directories',
      'Connect SerpAPI (or Google Search Console / Ads) to fetch accurate search and ranking data',
    ]);

    doc.end();
  } catch (err) {
    console.error('Failed generating PDF:', err);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
