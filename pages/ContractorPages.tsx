import React from 'react';
import ContractorPage, { ContractorConfig } from './ContractorPage';

const configs: Record<string, ContractorConfig> = {
  roofing: {
    trade: 'Roofing', headline: 'Get More Roofing Jobs From Google.', heroKeyword: '"roofing SEO service"',
    subheadline: 'Homeowners search "roofer near me" 2.4 million times a month. GBP Cortx puts your company at the top of that list — automatically.',
    accentColor: 'text-orange-400', accentBg: 'bg-orange-500/10 border-orange-500/30',
    painPoint: 'Most roofing companies lose 60–80% of potential jobs to the top 3 Google Maps listings. If you\'re not in the Map Pack, you\'re invisible.',
    benefits: ['Rank for "roofer near me" in your city', 'Auto-reply to every Google review', 'Weekly AI-generated GBP posts', 'Citation sync across 50+ directories', 'Ranking heatmap by zip code'],
    keywords: ['SEO for roofing companies', 'roofing lead generation', 'how to get more roofing leads', 'roofing company marketing', 'google maps ranking for roofers', 'roofing SEO service', 'GBP optimization for roofers', 'how to rank my roofing business on google'],
    stats: [{ value: '2.4M', label: 'Monthly searches for roofers' }, { value: '76%', label: 'Clicks go to top 3 results' }, { value: '60 days', label: 'Avg. time to reach #1' }],
    testimonial: { quote: "Within 60 days, I went from page 2 of Google to #1 in my area. My phone rings every single day now with qualified roofing jobs. I canceled my $2,500/month lead service.", name: "Marcus T.", title: "Owner, Peak Roofing Solutions", location: "Dallas, TX", result: "+340% Inbound Calls" },
    faqs: [
      { q: 'How long does it take to rank #1 for roofing keywords?', a: 'Most clients see movement in 30 days and reach the top 3 Map Pack within 60–90 days, depending on local competition.' },
      { q: 'Will this work in my city?', a: 'Yes. GBP Cortx works in any US market. We\'ve helped roofers rank #1 in cities from Dallas to Chicago to Miami.' },
      { q: 'Do I need to do anything after signing up?', a: 'Very little. The AI handles your posts, review replies, and citations automatically. You watch the calls come in.' },
    ]
  },
  hvac: {
    trade: 'HVAC', headline: 'Dominate "AC Repair Near Me" in Your City.', heroKeyword: '"HVAC marketing service"',
    subheadline: 'Every hot summer day, thousands of homeowners search for HVAC help. GBP Cortx ensures your company is the first call they make.',
    accentColor: 'text-blue-400', accentBg: 'bg-blue-500/10 border-blue-500/30',
    painPoint: 'HVAC is one of the most competitive local search categories. Without a fully optimized GBP, you\'re invisible when customers need you most — on the hottest days of the year.',
    benefits: ['Rank for "AC repair near me" & "HVAC near me"', 'Capture seasonal surge traffic', 'Auto-reply to every review within minutes', 'Weekly GBP posts with HVAC seasonal keywords', '24/7 citation monitoring'],
    keywords: ['HVAC marketing ideas', 'SEO for HVAC companies', 'how to get more HVAC leads', 'HVAC lead generation', 'google maps ranking for HVAC', 'HVAC digital marketing', 'GBP optimization for HVAC', 'how to grow my HVAC business'],
    stats: [{ value: '1.8M', label: 'Monthly HVAC searches in US' }, { value: '3x', label: 'More calls from top Map Pack' }, { value: '45 days', label: 'Avg. time to see results' }],
    testimonial: { quote: "I used to spend $3,000/month on lead services that sold the same lead to 5 companies. Now I'm at the top of Maps and customers call me directly. Best ROI I've ever seen.", name: "Jennifer R.", title: "Owner, Comfort HVAC Services", location: "Chicago, IL", result: "Saved $36k/year" },
    faqs: [
      { q: 'Does this help with both heating and cooling searches?', a: 'Yes. We optimize for all HVAC terms including AC repair, furnace repair, heat pump installation, and more — year-round.' },
      { q: 'Can GBP Cortx help during peak season?', a: 'Absolutely. We continuously update posts so you\'re ready when seasonal search spikes hit.' },
      { q: 'What if I have multiple service areas?', a: 'GBP Cortx supports multi-area optimization targeting each zip code and city in your service radius.' },
    ]
  },
  plumbing: {
    trade: 'Plumbing', headline: 'Be the First Plumber Homeowners Call.', heroKeyword: '"plumbing SEO service"',
    subheadline: 'Plumbing emergencies don\'t wait. When a pipe bursts at midnight, your business needs to be at the top of Google Maps — or they\'ll call someone else.',
    accentColor: 'text-cyan-400', accentBg: 'bg-cyan-500/10 border-cyan-500/30',
    painPoint: '"Plumber near me" is searched over 3 million times a month in the US. The top 3 Google Maps listings capture nearly all of that traffic.',
    benefits: ['Rank for "plumber near me" in every zip code', 'Capture emergency plumbing searches 24/7', 'Automatic review responses build trust fast', 'Weekly AI posts highlighting your services', 'Competitor ranking heatmap by area'],
    keywords: ['SEO for plumbers', 'plumbing lead generation', 'how to get more plumbing customers', 'plumber marketing ideas', 'google maps ranking for plumbers', 'plumbing company marketing', 'GBP optimization for plumbers', 'how to grow my plumbing business'],
    stats: [{ value: '3M+', label: 'Monthly plumber searches' }, { value: '80%', label: 'Emergency jobs go to top result' }, { value: '6 weeks', label: 'Avg. time to reach top 3' }],
    testimonial: { quote: "6 weeks in and we're showing up #1 for 'plumber near me' in three different zip codes. The difference in call volume is incredible — and these are real customers, not shared leads.", name: "Carlos M.", title: "Owner, M&M Plumbing Co.", location: "Miami, FL", result: "#1 in 3 Zip Codes" },
    faqs: [
      { q: 'Will this help with emergency plumbing calls?', a: 'Yes. Emergency searches like "plumber open now" and "24 hour plumber near me" are high priority targets we optimize for.' },
      { q: 'I\'m already getting some calls. Why do I need this?', a: 'If you\'re getting some calls but not dominating, competitors above you are taking 3–5x more jobs. Significant revenue is on the table.' },
      { q: 'How does review automation work?', a: 'Our AI sends review request texts after completed jobs, then crafts professional, keyword-rich replies to every review you receive.' },
    ]
  },
  solar: {
    trade: 'Solar', headline: 'Capture High-Value Solar Leads From Google Maps.', heroKeyword: '"solar company marketing"',
    subheadline: 'A single solar installation is worth $15,000–$45,000. Make sure your company appears first when homeowners search for solar.',
    accentColor: 'text-yellow-400', accentBg: 'bg-yellow-500/10 border-yellow-500/30',
    painPoint: 'Solar is one of the highest-value local markets. A single Map Pack ranking improvement can mean $50,000+ in additional revenue per month.',
    benefits: ['Rank for "solar installation near me"', 'Target high-income neighborhoods by zip code', 'Showcase project photos to build trust', 'Auto-manage reviews mentioning savings & ROI', 'Citation building on energy-industry directories'],
    keywords: ['solar company marketing', 'SEO for solar companies', 'solar lead generation', 'how to get more solar leads', 'google maps ranking for solar installers', 'solar digital marketing', 'GBP optimization for solar', 'how to grow my solar business'],
    stats: [{ value: '$35k', label: 'Avg. solar installation value' }, { value: '900k', label: 'Monthly solar searches' }, { value: '1 job', label: 'Pays for 6+ months of service' }],
    testimonial: { quote: "We went from 3 inbound quote requests a week to 15+. At our average deal size, that's a massive difference. GBP Cortx paid for itself in the first installation.", name: "David K.", title: "Owner, SunPath Solar", location: "Phoenix, AZ", result: "+400% Inbound Quotes" },
    faqs: [
      { q: 'Can you target specific zip codes with high solar adoption?', a: 'Yes. Our heatmap tool shows exactly where you rank in each zip code so we can target the highest-opportunity neighborhoods.' },
      { q: 'How do you handle the long solar sales cycle?', a: 'We focus your GBP on trust signals — photos of installs, review management, and educational posts about savings and incentives.' },
      { q: 'Can this work alongside paid ads?', a: 'Absolutely. Organic Map Pack rankings and paid ads compound each other, making you appear dominant and trustworthy.' },
    ]
  },
  landscaping: {
    trade: 'Landscaping', headline: 'Fill Your Landscaping Schedule From Google.', heroKeyword: '"landscaping marketing"',
    subheadline: 'Homeowners search for landscapers 1.2 million times a month. GBP Cortx gets your company in front of them at the exact moment they\'re ready to hire.',
    accentColor: 'text-green-400', accentBg: 'bg-green-500/10 border-green-500/30',
    painPoint: 'Landscaping is hyper-local and hyper-seasonal. Companies that dominate Maps in spring fill their entire season in weeks — the rest scramble all year.',
    benefits: ['Rank for "landscaping near me" before spring rush', 'Showcase before/after photos in GBP posts', 'Capture lawn care, tree service & hardscaping searches', 'Auto-request reviews after every job', 'Seasonal keyword strategy (spring, fall, snow removal)'],
    keywords: ['landscaping marketing ideas', 'SEO for landscapers', 'how to get more landscaping customers', 'landscaping lead generation', 'google maps ranking for landscapers', 'lawn care marketing', 'GBP optimization for landscapers', 'how to grow my landscaping business'],
    stats: [{ value: '1.2M', label: 'Monthly landscaping searches' }, { value: '5x', label: 'More spring calls vs. prior year' }, { value: '30 days', label: 'To start seeing results' }],
    testimonial: { quote: "We were fully booked 3 weeks into spring for the first time ever. GBP Cortx had us showing up #1 for 'landscaping near me' right when people started searching.", name: "Ryan H.", title: "Owner, Green Edge Landscaping", location: "Columbus, OH", result: "Fully booked in 3 weeks" },
    faqs: [
      { q: 'Does this help seasonal businesses?', a: 'It\'s perfect for seasonal businesses. We build rankings during the off-season so you\'re at #1 when seasonal searches spike.' },
      { q: 'Can I target multiple services like lawn care AND hardscaping?', a: 'Yes. We optimize for all your service lines — lawn maintenance, hardscaping, tree services, irrigation, and more.' },
      { q: 'How does review generation work?', a: 'After each job, our AI sends a review request via SMS. Most clients see 40–60% response rates vs. 5% for manual methods.' },
    ]
  }
};

export const RoofingPage = () => <ContractorPage config={configs.roofing} />;
export const HVACPage = () => <ContractorPage config={configs.hvac} />;
export const PlumbingPage = () => <ContractorPage config={configs.plumbing} />;
export const SolarPage = () => <ContractorPage config={configs.solar} />;
export const LandscapingPage = () => <ContractorPage config={configs.landscaping} />;
