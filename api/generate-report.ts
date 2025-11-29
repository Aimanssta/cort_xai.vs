import { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';

// Generates a professional graphical PDF report with colors, charts, and styled sections
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { form, analysis } = req.body || {};
    if (!form || !analysis) {
      return res.status(400).json({ error: 'form and analysis are required' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
    const chunks: any[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${(form.businessName || 'report').replace(/\s+/g, '_')}.pdf"`);
      res.send(result);
    });

    // PAGE 1: TITLE & EXECUTIVE SUMMARY
    drawRect(doc, 0, 0, 595, 180, '#0f172a');
    doc.fontSize(28).fillColor('#10b981').text('Local SEO & AIO Audit', 40, 40, { width: 515 });
    doc.fontSize(16).fillColor('#ffffff').text(`${form.businessName || 'Business'}`, 40, 85);
    doc.fontSize(10).fillColor('#d1d5db').text(`Report Generated: ${new Date().toLocaleDateString()}`, 40, 110);

    doc.moveDown(12);

    // Business Info Card
    doc.rect(40, doc.y, 515, 90).fill('#f3f4f6').stroke('#e5e7eb');
    doc.fontSize(11).fillColor('#0f172a').text('Business Information', 50, doc.y + 10, { bold: true });
    doc.fontSize(9).fillColor('#374151');
    doc.text(`Website: ${form.website || '—'}`, 50, doc.y + 5);
    doc.text(`Service Area: ${form.serviceArea || '—'}`, 50, doc.y + 20);
    doc.text(`Google Profile: ${form.googleProfile ? 'Verified' : 'Not Provided'}`, 50, doc.y + 35);
    doc.text(`Keywords Tracked: ${form.primaryKeywords || '—'}`, 50, doc.y + 50);
    doc.moveDown(13);

    // Key Metrics
    doc.fontSize(14).fillColor('#0f172a').text('Key Metrics', 40, doc.y, { bold: true });
    doc.moveDown(2);

    const metrics = [
      { label: 'Local Searches', value: analysis.estimated_searches, color: '#3b82f6' },
      { label: '1st Page Results', value: analysis.first_page_visibility, color: '#f59e0b' },
      { label: 'Internal Links', value: analysis.internalLinks, color: '#10b981' },
      { label: 'External Links', value: analysis.externalLinks, color: '#8b5cf6' },
    ];

    const startY = doc.y;
    metrics.forEach((m, i) => {
      const x = 40 + i * 130;
      doc.rect(x, startY, 115, 75).fill('#ffffff').stroke('#e5e7eb');
      doc.fontSize(8).fillColor('#6b7280').text(m.label, x + 8, startY + 10, { width: 99 });
      doc.fontSize(18).fillColor(m.color).text(m.value.toString(), x + 8, startY + 30, { bold: true });
    });

    doc.moveDown(12);

    // Website Analysis Section
    doc.fontSize(14).fillColor('#0f172a').text('Website Analysis', 40, doc.y, { bold: true });
    doc.moveDown(1.5);

    doc.rect(40, doc.y, 515, 85).fill('#fafbfc').stroke('#e5e7eb');
    const analysisY = doc.y + 10;
    doc.fontSize(9).fillColor('#374151');
    doc.text(`Page Title: ${analysis.title || 'Not Found'}`, 50, analysisY, { width: 495 });
    doc.text(`Meta Description: ${(analysis.description || 'Not Optimized').substring(0, 75)}${(analysis.description || '').length > 75 ? '...' : ''}`, 50, analysisY + 18, { width: 495 });
    doc.text(`SEO Score: ${calculateSEOScore(analysis)}/100`, 50, analysisY + 36, { bold: true });
    doc.text(`Total Links Analyzed: ${analysis.internalLinks + analysis.externalLinks}`, 50, analysisY + 54);

    doc.moveDown(12);

    // Add second page
    doc.addPage();

    // Recommendations
    doc.fontSize(14).fillColor('#0f172a').text('Recommendations & Action Plan', 40, 40, { bold: true });
    doc.moveDown(2);

    const recommendations = [
      { 
        title: '1. Google Business Profile Optimization',
        desc: 'Claim and verify your Google Business Profile. Ensure NAP (Name, Address, Phone) consistency across all online platforms. Add high-quality photos and respond to customer reviews promptly.'
      },
      { 
        title: '2. On-Page SEO Optimization',
        desc: 'Optimize title tags, meta descriptions, and headers for local keywords. Implement structured data markup (FAQ, LocalBusiness schema). Improve site speed and mobile responsiveness.'
      },
      { 
        title: '3. Local Content Strategy',
        desc: 'Publish location-specific landing pages and blog posts targeting local keywords. Create service-area content that addresses customer pain points and questions.'
      },
      { 
        title: '4. Citation Building & NAP Consistency',
        desc: 'Build citations across authoritative directories (Yelp, BBB, LinkedIn, industry directories). Ensure consistent Name, Address, Phone across all listings.'
      },
      { 
        title: '5. Review Management',
        desc: 'Actively encourage customers to leave reviews on Google, Yelp, and other platforms. Respond to all reviews (positive and negative) within 48 hours.'
      },
      { 
        title: '6. Link Building & Authority',
        desc: 'Acquire backlinks from local and industry-relevant websites. Partner with local organizations, sponsors events, or create locally-focused content that attracts links.'
      },
    ];

    let recY = doc.y + 15;
    recommendations.forEach((rec, i) => {
      if (recY > 720) {
        doc.addPage();
        recY = 50;
      }

      const bgColor = i % 2 === 0 ? '#f0fdf4' : '#f3f4f6';
      doc.rect(40, recY, 515, 75).fill(bgColor).stroke('#e5e7eb');

      doc.fontSize(10).fillColor('#10b981').text(rec.title, 50, recY + 8, { bold: true, width: 495 });
      doc.fontSize(8).fillColor('#374151').text(rec.desc, 50, recY + 28, { width: 495 });

      recY += 85;
    });

    // Footer
    doc.fontSize(9).fillColor('#6b7280').text('For a comprehensive SEO strategy tailored to your business, contact us for a consultation.', 40, doc.y + 20, { align: 'center', width: 515 });

    doc.end();
  } catch (err) {
    console.error('Failed generating PDF:', err);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

function drawRect(doc: any, x: number, y: number, w: number, h: number, color: string) {
  doc.rect(x, y, w, h).fill(color);
}

function calculateSEOScore(analysis: any): number {
  let score = 50;
  if (analysis.title && analysis.title.length > 20) score += 15;
  if (analysis.description && analysis.description.length > 50) score += 15;
  if (analysis.internalLinks > 10) score += 10;
  if (analysis.externalLinks > 5) score += 10;
  return Math.min(score, 100);
}
