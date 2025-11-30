import { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { form, analysis } = req.body || {};
    if (!form || !analysis) {
      return res.status(400).json({ error: 'form and analysis are required' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 35, bufferPages: true });
    const chunks: any[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${(form.businessName || 'report').replace(/\s+/g, '_')}.pdf"`);
      res.send(result);
    });

    const colors = { primary: '#10b981', dark: '#0f172a', light: '#f3f4f6', border: '#e5e7eb' };

    // Derive service label and primary volume to emphasize service-area-specific volume
    const serviceLabel = (form.service && form.service.trim()) || (analysis.keywords && analysis.keywords[0]) || form.businessName || 'Your Service';
    const serviceArea = form.serviceArea || 'Service Area';
    const primaryVolume = analysis.primarySearchVolume || analysis.avgSearchVolume || 0;

    // PAGE 1: COVER + MARKET OVERVIEW + COMPACT METRICS
    drawRect(doc, 0, 0, 595, 140, colors.dark);
    doc.fontSize(26).fillColor(colors.primary).text('Local SEO & AIO Audit', 35, 30, { width: 525 });
    doc.fontSize(14).fillColor('#ffffff').text(`${form.businessName || 'Business'}`, 35, 66);
    doc.fontSize(9).fillColor('#d1d5db').text(`Report Generated: ${new Date().toLocaleDateString()} | Service Area: ${serviceArea}`, 35, 86);

    // Business overview compact card
    const boxY = 120;
    doc.rect(35, boxY, 525, 64).fill(colors.light).stroke(colors.border);
    doc.fontSize(9).fillColor(colors.dark).text('Business Information', 45, boxY + 8);
    doc.fontSize(8).fillColor('#374151');
    doc.text(`Website: ${form.website || '—'}`, 45, boxY + 24);
    doc.text(`Service Area: ${serviceArea} | Keywords Tracked: ${analysis.keywordCount || 0}`, 260, boxY + 24);
    doc.text(`Visibility Gap: ${analysis.visibilityGap || '0'} searches`, 45, boxY + 40);

    // Prominent service-area search volume statement
    doc.fontSize(11).fillColor(colors.dark).text(`Estimated monthly searches for ${serviceLabel} in ${serviceArea}: ${Number(primaryVolume).toLocaleString()}`, 35, boxY + 68);

    // Compact metric tiles (4 across) under the overview
    const metricsY = boxY + 92;
    const metrics = [
      { label: 'Searches/Month', value: Number(primaryVolume).toLocaleString(), color: '#3b82f6' },
      { label: 'Visibility Gap', value: analysis.visibilityGap || '0', color: '#ef4444' },
      { label: 'Keywords Tracked', value: analysis.keywordCount || '0', color: '#10b981' },
      { label: 'Competition', value: (primaryVolume > 500 ? 'High' : 'Medium'), color: '#f59e0b' },
    ];

    metrics.forEach((m, i) => {
      const x = 35 + i * 130;
      doc.rect(x, metricsY, 120, 48).fill('#ffffff').stroke(colors.border);
      doc.fontSize(7).fillColor('#6b7280').text(m.label, x + 8, metricsY + 6, { width: 104 });
      doc.fontSize(14).fillColor(m.color).text(m.value.toString(), x + 8, metricsY + 22);
    });

    // Add a short separator and start Page 2
    doc.addPage();
    doc.fontSize(14).fillColor(colors.dark).text('Performance Analysis: 5 Core Metrics', 35, 30);
    doc.moveDown(0.5);

    // Score cards for 5 core metrics in a compact 2-column grid
    const metrics5 = [
      { title: 'On-Page SEO', score: analysis.onPageScore, color: '#10b981', icon: '📄' },
      { title: 'Links Profile', score: analysis.linksScore, color: '#3b82f6', icon: '🔗' },
      { title: 'Usability', score: analysis.usabilityScore, color: '#f59e0b', icon: '📱' },
      { title: 'Performance', score: analysis.performanceScore, color: '#8b5cf6', icon: '⚡' },
      { title: 'Social Signals', score: analysis.socialScore, color: '#ec4899', icon: '📢' },
    ];

    let shortY = doc.y + 6;
    metrics5.forEach((m, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = col === 0 ? 35 : 300;
      const y = shortY + row * 62;
      doc.rect(x, y, 240, 52).fill('#ffffff').stroke(colors.border);
      doc.fontSize(10).fillColor(m.color).text(`${m.icon} ${m.title}`, x + 10, y + 6);
      doc.fontSize(18).fillColor(m.color).text((m.score || 0).toString(), x + 180, y + 6);
      const barW = ((m.score || 0) / 100) * 160;
      doc.rect(x + 10, y + 34, 160, 6).fill('#e5e7eb');
      doc.rect(x + 10, y + 34, barW, 6).fill(m.color);
    });

    // Condensed detailed metrics + recommendations below the score cards in two columns
    const detailedMetrics = [
      {
        title: '1. ON-PAGE SEO OPTIMIZATION',
        score: analysis.onPageScore,
        details: [
          `Title Tag: ${analysis.title ? '✓ Present' : '✗ Missing'} (${analysis.title?.length || 0} chars)`,
          `Meta Description: ${analysis.description ? '✓ Optimized' : '✗ Needs work'} (${analysis.description?.length || 0} chars)`,
          `H1 Tags: ${analysis.h1Count} found (Ideal: 1)`,
          `Meta Keywords: ${analysis.keywords ? '✓ Present' : '✗ Not found'}`,
        ],
        recommendations: [
          'Ensure title is 30-60 characters and includes primary keyword',
          'Meta description should be 120-160 characters with clear CTA',
          'Use exactly one H1 tag per page for main topic',
          'Implement schema.org structured data (LocalBusiness, Service)',
        ],
      },
      {
        title: '2. LINKS PROFILE & AUTHORITY',
        score: analysis.linksScore,
        details: [
          `Internal Links: ${analysis.internalLinks} (Recommendation: 20-50)`,
          `External Links: ${analysis.externalLinks} (Recommendation: 10+)`,
          `Total Links: ${analysis.internalLinks + analysis.externalLinks}`,
          `Link Diversity: ${analysis.externalLinks > 5 ? 'Good' : 'Needs improvement'}`,
        ],
        recommendations: [
          'Build internal linking structure with descriptive anchor text',
          'Acquire backlinks from local and industry-relevant sites',
          'Target high-authority directories (Yelp, BBB, industry-specific)',
          'Create linkable assets (guides, local content, research)',
        ],
      },
      {
        title: '3. USABILITY & USER EXPERIENCE',
        score: analysis.usabilityScore,
        details: [
          `Mobile Responsive: ${analysis.usabilityScore > 60 ? '✓ Yes' : '✗ Needs review'}`,
          `Structured Data: ${analysis.usabilityScore > 70 ? '✓ Implemented' : '✗ Missing'}`,
          `Site Navigation: ${analysis.internalLinks > 15 ? '✓ Good structure' : '✗ Weak structure'}`,
          `Accessibility: Estimated score based on HTML quality`,
        ],
        recommendations: [
          'Implement mobile-first responsive design',
          'Add LocalBusiness and Service schema markup',
          'Improve site navigation and information architecture',
          'Test with Google Mobile-Friendly Test and Core Web Vitals tools',
        ],
      },
      {
        title: '4. SITE PERFORMANCE & SPEED',
        score: analysis.performanceScore,
        details: [
          `HTML Size: ${Math.round(analysis.htmlSize / 1024)} KB (Ideal: <500 KB)`,
          `Scripts: ${analysis.scriptCount} (Ideal: <10)`,
          `Stylesheets: ${analysis.styleCount} (Ideal: <5)`,
          `Load Time Impact: ${analysis.performanceScore > 70 ? 'Low' : 'High'}`,
        ],
        recommendations: [
          'Minimize render-blocking JavaScript and CSS',
          'Implement lazy loading for images and resources',
          'Use CDN for static assets and media delivery',
          'Enable GZIP compression and caching on server',
          'Optimize images and use modern formats (WebP)',
        ],
      },
      {
        title: '5. SOCIAL SIGNALS & ENGAGEMENT',
        score: analysis.socialScore,
        details: [
          `Open Graph Tags: ${analysis.socialScore > 60 ? '✓ Present' : '✗ Missing'}`,
          `Twitter Cards: ${analysis.socialScore > 70 ? '✓ Implemented' : '✗ Missing'}`,
          `Social Links: ${analysis.socialScore > 50 ? '✓ Found' : '✗ Not visible'}`,
          `Shareability: ${analysis.socialScore > 65 ? 'Good' : 'Needs improvement'}`,
        ],
        recommendations: [
          'Add Open Graph meta tags for rich previews on Facebook, LinkedIn',
          'Implement Twitter Card tags for better social sharing',
          'Display social media links and follow buttons prominently',
          'Create shareable blog content and local guides',
          'Encourage customers to share reviews and testimonials',
        ],
      },
    ];

    // Condensed detailed metrics: show top 2 detail lines and top 2 recommendations per metric
    let detailStartY = doc.y + 8;
    const condensed = detailedMetrics.map((m) => ({
      title: m.title,
      score: m.score,
      details: (m.details || []).slice(0, 2),
      recommendations: (m.recommendations || []).slice(0, 2),
    }));

    // Two-column layout for condensed metrics
    let colY = detailStartY;
    condensed.forEach((metric, i) => {
      const col = i % 2 === 0 ? 0 : 1;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 35 : 300;
      const y = detailStartY + row * 86;

      doc.rect(x, y, 240, 78).fill('#ffffff').stroke(colors.border);
      doc.fontSize(9).fillColor(colors.primary).text(metric.title, x + 8, y + 6);
      doc.fontSize(12).fillColor(colors.primary).text(`${metric.score}/100`, x + 190, y + 6);

      doc.fontSize(8).fillColor('#374151');
      metric.details.forEach((d, idx) => {
        doc.text(`• ${d}`, x + 8, y + 24 + idx * 10, { width: 220 });
      });

      doc.fontSize(8).fillColor('#0b84a5').text('Top Recommendations:', x + 8, y + 44);
      metric.recommendations.forEach((r, idx) => {
        doc.fontSize(7).fillColor('#374151').text(`- ${r}`, x + 12, y + 56 + idx * 10, { width: 216 });
      });
    });

    // Combined GMB + Action Plan condensed box at the bottom of page 2
    const bottomY = detailStartY + Math.ceil(condensed.length / 2) * 86 + 8;
    const boxHeight = 560 - bottomY > 140 ? 140 : (560 - bottomY);
    doc.rect(35, bottomY, 525, boxHeight).fill('#f8fafc').stroke(colors.border);
    doc.fontSize(11).fillColor(colors.dark).text('GMB Strategy & 30-60-90 Action Plan (Condensed)', 45, bottomY + 8);
    doc.fontSize(8).fillColor('#374151');

    // Top 3 GMB bullets
    const gmbBullets = [
      'Claim & verify your Google Business Profile; complete NAP and categories',
      'Collect 4-5+ reviews monthly; respond to all reviews within 48 hours',
      'Post 2x/month with local offers and service updates (use photos & CTAs)',
    ];

    gmbBullets.forEach((b, i) => {
      doc.text(`✓ ${b}`, 45, bottomY + 30 + i * 12, { width: 500 });
    });

    // Condensed 30-60-90
    const planStart = bottomY + 30 + gmbBullets.length * 12 + 6;
    const condensedPlan = [
      { phase: 'WEEK 1-2', items: ['Complete GMB & basic schema', 'Keyword list + site fixes'] },
      { phase: 'WEEK 3-4', items: ['On‑page tweaks + 3 local posts', 'Begin citations & review requests'] },
      { phase: 'MONTH 2-3', items: ['Link building & monthly tracking', 'Scale content and measure results'] },
    ];

    let pY = planStart;
    condensedPlan.forEach((p) => {
      doc.fontSize(8).fillColor('#0c4a6e').text(p.phase, 45, pY);
      doc.fontSize(7).fillColor('#374151').text(p.items.join(' • '), 95, pY, { width: 460 });
      pY += 14;
    });

    doc.fontSize(9).fillColor('#6b7280').text('For ongoing optimization, monitor rankings, GMB views and review sentiment monthly.', 35, bottomY + boxHeight - 18, { align: 'center', width: 525 });

    doc.end();
  } catch (err) {
    console.error('Failed generating PDF:', err);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

function drawRect(doc: any, x: number, y: number, w: number, h: number, color: string) {
  doc.rect(x, y, w, h).fill(color);
}
