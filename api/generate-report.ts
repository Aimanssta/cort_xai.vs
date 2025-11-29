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

    // PAGE 1: COVER & SEARCH VOLUME OVERVIEW
    drawRect(doc, 0, 0, 595, 160, colors.dark);
    doc.fontSize(28).fillColor('#10b981').text('Local SEO & AIO Audit', 35, 35, { width: 525 });
    doc.fontSize(16).fillColor('#ffffff').text(`${form.businessName || 'Business'}`, 35, 80);
    doc.fontSize(10).fillColor('#d1d5db').text(`Report Generated: ${new Date().toLocaleDateString()} | Service Area: ${form.serviceArea || 'N/A'}`, 35, 105);

    doc.moveDown(7);

    // Business Overview Card
    const boxY = doc.y;
    doc.rect(35, boxY, 525, 80).fill('#f3f4f6').stroke('#e5e7eb');
    doc.fontSize(10).fillColor(colors.dark).text('Business Information', 45, boxY + 10, { bold: true });
    doc.fontSize(8).fillColor('#374151');
    doc.text(`Website: ${form.website || '—'}`, 45, boxY + 28);
    doc.text(`Service Area: ${form.serviceArea || '—'} | Keywords Tracked: ${analysis.keywordCount || 0}`, 45, boxY + 42);
    doc.text(`Avg. Local Search Volume: ${analysis.avgSearchVolume?.toLocaleString() || '0'} | Visibility Gap: ${analysis.visibilityGap || '0'} searches`, 45, boxY + 56);
    doc.moveDown(13);

    // SEARCH VOLUME & LOCAL INSIGHTS
    doc.fontSize(12).fillColor(colors.dark).text('Local Search Market', 35, doc.y, { bold: true });
    doc.moveDown(1);

    const metricsY = doc.y;
    const metrics = [
      { label: 'Searches/Month', value: analysis.avgSearchVolume?.toLocaleString() || '0', color: '#3b82f6' },
      { label: 'Visibility Gap', value: analysis.visibilityGap || '0', color: '#ef4444' },
      { label: 'Keywords Tracked', value: analysis.keywordCount || '0', color: '#10b981' },
      { label: 'Competition Level', value: analysis.avgSearchVolume > 500 ? 'High' : 'Medium', color: '#f59e0b' },
    ];

    metrics.forEach((m, i) => {
      const x = 35 + i * 135;
      doc.rect(x, metricsY, 120, 65).fill('#ffffff').stroke(colors.border);
      doc.fontSize(7).fillColor('#6b7280').text(m.label, x + 8, metricsY + 8, { width: 104 });
      doc.fontSize(16).fillColor(m.color).text(m.value.toString(), x + 8, metricsY + 24, { bold: true });
    });

    doc.moveDown(11);

    // PAGE 2: FIVE CORE METRICS ANALYSIS
    doc.addPage();
    doc.fontSize(14).fillColor(colors.dark).text('Performance Analysis: 5 Core Metrics', 35, 40, { bold: true });
    doc.moveDown(2);

    // Score cards for all 5 metrics
    const metrics5 = [
      { title: 'On-Page SEO', score: analysis.onPageScore, color: '#10b981', icon: '📄' },
      { title: 'Links Profile', score: analysis.linksScore, color: '#3b82f6', icon: '🔗' },
      { title: 'Usability', score: analysis.usabilityScore, color: '#f59e0b', icon: '📱' },
      { title: 'Performance', score: analysis.performanceScore, color: '#8b5cf6', icon: '⚡' },
      { title: 'Social Signals', score: analysis.socialScore, color: '#ec4899', icon: '📢' },
    ];

    let cardY = doc.y + 5;
    metrics5.forEach((m, i) => {
      if (i > 0 && i % 2 === 0) cardY += 75;
      const x = i % 2 === 0 ? 35 : 310;

      // Draw score card
      doc.rect(x, cardY, 240, 65).fill('#ffffff').stroke(colors.border);
      doc.fontSize(11).fillColor(m.color).text(`${m.icon} ${m.title}`, x + 12, cardY + 10, { bold: true });
      doc.fontSize(24).fillColor(m.color).text(m.score.toString(), x + 170, cardY + 12);
      doc.fontSize(8).fillColor('#6b7280').text('/100', x + 210, cardY + 18);

      // Score bar
      const barWidth = (m.score / 100) * 200;
      doc.rect(x + 12, cardY + 45, 200, 6).fill('#e5e7eb');
      doc.rect(x + 12, cardY + 45, barWidth, 6).fill(m.color);
    });

    doc.moveDown(20);

    // PAGE 3: DETAILED METRIC ANALYSIS
    doc.addPage();
    doc.fontSize(14).fillColor(colors.dark).text('Detailed Metric Analysis & Recommendations', 35, 40, { bold: true });
    doc.moveDown(2);

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

    let detailY = doc.y + 10;
    detailedMetrics.forEach((metric, idx) => {
      if (detailY > 680) {
        doc.addPage();
        detailY = 40;
      }

      // Metric header with score
      doc.rect(35, detailY, 525, 30).fill('#f0fdf4').stroke(colors.border);
      doc.fontSize(10).fillColor(colors.primary).text(metric.title, 45, detailY + 7, { bold: true });
      doc.fontSize(12).fillColor(colors.primary).text(`${metric.score}/100`, 520, detailY + 7, { align: 'right' });

      detailY += 40;

      // Details and recommendations
      doc.fontSize(8).fillColor('#374151');
      metric.details.forEach((detail) => {
        doc.text(`• ${detail}`, 45, detailY, { width: 505 });
        detailY += 15;
      });

      detailY += 5;
      doc.fontSize(8).fillColor(colors.primary).text('Recommendations:', 45, detailY, { bold: true });
      detailY += 12;

      metric.recommendations.forEach((rec) => {
        doc.fontSize(7).fillColor('#374151').text(`◆ ${rec}`, 50, detailY, { width: 500 });
        detailY += 14;
      });

      detailY += 10;
    });

    // PAGE 4: GMB STRATEGY
    doc.addPage();
    doc.fontSize(14).fillColor(colors.dark).text('Google Business Profile (GMB) Strategy', 35, 40, { bold: true });
    doc.moveDown(2);

    const gmbSections = [
      {
        title: 'Profile Optimization (High Priority)',
        items: [
          'Claim and verify ownership of your Google Business Profile',
          'Complete all profile fields: business name, address, phone, hours, categories',
          'Ensure NAP (Name, Address, Phone) matches your website exactly',
          'Upload 10+ high-quality business photos (storefront, team, work samples)',
          'Add service areas and service list with descriptions and pricing if applicable',
        ],
      },
      {
        title: 'Engagement & Reviews (High Priority)',
        items: [
          'Target goal: 4.5+ star average rating across all platforms',
          'Ask satisfied customers for Google reviews via email, SMS, QR codes',
          'Respond to ALL reviews within 24-48 hours (positive and negative)',
          'Address customer concerns professionally and offer solutions in responses',
          'Monitor review trends and adjust service/communication accordingly',
        ],
      },
      {
        title: 'Content & Posts (High Priority)',
        items: [
          'Post 2-4 times per month: new services, promotions, events, blog updates',
          'Use local keywords and service-specific language in post descriptions',
          'Add photos/videos to posts for higher engagement and visibility',
          'Include clear CTAs (call, book, learn more, shop) in each post',
          'Monitor post analytics to see which content drives calls/visits',
        ],
      },
      {
        title: 'Q&A & Messaging (High Priority)',
        items: [
          'Monitor and answer customer Q&A section promptly',
          'Enable Google messaging/booking features for direct customer communication',
          'Reply to messages within a few hours to show active presence',
          'Use messaging as an opportunity to qualify leads and convert',
          'Keep FAQs updated based on common customer questions',
        ],
      },
    ];

    let gmbY = doc.y + 10;
    gmbSections.forEach((section, idx) => {
      if (gmbY > 700) {
        doc.addPage();
        gmbY = 40;
      }

      doc.rect(35, gmbY, 525, 28).fill('#fef08a').stroke(colors.border);
      doc.fontSize(10).fillColor('#92400e').text(`⭐ ${section.title}`, 45, gmbY + 7, { bold: true });
      gmbY += 35;

      section.items.forEach((item) => {
        doc.fontSize(8).fillColor('#374151').text(`✓ ${item}`, 50, gmbY, { width: 490 });
        gmbY += 18;
      });

      gmbY += 8;
    });

    // PAGE 5: ACTION PLAN & NEXT STEPS
    doc.addPage();
    doc.fontSize(14).fillColor(colors.dark).text('30-60-90 Day Action Plan', 35, 40, { bold: true });
    doc.moveDown(2);

    const actionPlan = [
      {
        phase: 'WEEK 1-2: Foundation',
        items: [
          'Claim and complete GMB profile (all required fields)',
          'Conduct keyword research for 10-20 target service area keywords',
          'Audit website structure and improve internal linking',
          'Add Open Graph and structured data markup',
        ],
      },
      {
        phase: 'WEEK 3-4: Optimization',
        items: [
          'Optimize title tags and meta descriptions for primary keywords',
          'Publish 3-5 local service pages or blog posts',
          'Begin citation building on relevant directories',
          'Set up review request campaigns (email, SMS, Google)',
        ],
      },
      {
        phase: 'MONTH 2: Authority Building',
        items: [
          'Start link acquisition from local and industry sites',
          'Post 2x/week on GMB with local keywords and CTAs',
          'Respond to all reviews and Q&A promptly',
          'Implement performance optimizations (speed, mobile, Core Web Vitals)',
        ],
      },
      {
        phase: 'MONTH 3: Scale & Measure',
        items: [
          'Analyze results: search rankings, GMB views, call/message volume',
          'Double down on high-performing content and keywords',
          'Expand content library with new service and location pages',
          'Plan for ongoing optimization and competitive monitoring',
        ],
      },
    ];

    let planY = doc.y + 10;
    actionPlan.forEach((plan) => {
      if (planY > 700) {
        doc.addPage();
        planY = 40;
      }

      doc.rect(35, planY, 525, 26).fill('#e0f2fe').stroke(colors.border);
      doc.fontSize(9).fillColor('#0c4a6e').text(plan.phase, 45, planY + 6, { bold: true });
      planY += 32;

      plan.items.forEach((item) => {
        doc.fontSize(8).fillColor('#374151').text(`→ ${item}`, 50, planY, { width: 490 });
        planY += 15;
      });

      planY += 8;
    });

    doc.fontSize(9).fillColor('#6b7280').text('For ongoing optimization and competitive analysis, consider monthly tracking of rankings, review sentiment, and search visibility.', 35, doc.y + 15, { align: 'center', width: 525 });

    doc.end();
  } catch (err) {
    console.error('Failed generating PDF:', err);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

function drawRect(doc: any, x: number, y: number, w: number, h: number, color: string) {
  doc.rect(x, y, w, h).fill(color);
}
