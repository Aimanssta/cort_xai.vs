import React from 'react';
import { ArrowRight, MapPin, Users, DollarSign, CheckCircle, TrendingUp, Globe2, Award } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const FloridaSEO: React.FC = () => {
  const floridaCities = [
    'Miami', 'Tampa', 'Jacksonville', 'Orlando', 'Fort Lauderdale',
    'Clearwater', 'St. Petersburg', 'Fort Myers', 'Gainesville', 'Boca Raton'
  ];

  return (
    <>
      <SEO 
        title="AI Sales Agents & Lead Generation Florida | Marketing Automation Services"
        description="Cort X AI helps Florida businesses generate qualified leads, automate sales, and grow revenue with AI-powered agents. Serving Miami, Tampa, Jacksonville, Orlando & across Florida."
        keywords="Florida marketing automation, Miami lead generation, Tampa sales agents, Florida B2B leads, Orlando marketing services, Boca Raton sales automation, Florida business growth, AI marketing Florida"
        canonical="https://cort-xai-vs-mon4.vercel.app/#/florida"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Cort X AI - Florida',
          image: 'https://cort-xai-vs-mon4.vercel.app/og-image.png',
          description: 'AI-powered sales agents and lead generation for Florida businesses',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '100 Innovation Dr, Suite 500',
            addressLocality: 'Miami',
            addressRegion: 'FL',
            postalCode: '33101',
            addressCountry: 'US'
          },
          areaServed: [
            { '@type': 'State', name: 'Florida' },
            { '@type': 'City', name: 'Miami' },
            { '@type': 'City', name: 'Tampa' },
            { '@type': 'City', name: 'Jacksonville' },
            { '@type': 'City', name: 'Orlando' },
          ],
          telephone: '+1-888-555-0123',
          email: 'sales@cortxai.com',
          url: 'https://cort-xai-vs-mon4.vercel.app',
          priceRange: '$$',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '1200'
          }
        }}
      />

      <div className="bg-slate-950 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-24 md:pb-40 pt-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-grid-slate-900 bg-[length:40px_40px] opacity-30"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cort-600/20 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-cort-500/30 mb-6">
              <MapPin className="h-4 w-4 text-cort-400" />
              <span className="text-sm font-medium text-cort-300">Serving Florida Businesses</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Grow Your Florida <br />
              <span className="gradient-text">Business With AI</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8">
              From Miami to Jacksonville, Cort X AI helps Florida businesses generate qualified leads, automate sales, and dominate their local markets with intelligent AI agents and lead generation tools.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/contact" variant="primary" className="text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button to="/contact" variant="outline" className="text-lg px-8 py-3">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Florida Cities Served */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Trusted by Businesses Across Florida
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {floridaCities.map((city, idx) => (
                <div key={idx} className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-4 text-center border border-slate-700">
                  <MapPin className="h-5 w-5 text-cort-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">{city}</h3>
                  <p className="text-xs text-slate-400 mt-1">Marketing Automation</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">
              Why Florida Businesses Choose Cort X AI
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Qualified Lead Generation',
                  desc: 'Get pre-qualified B2B leads from across Florida, ready to buy from your business.'
                },
                {
                  icon: <DollarSign className="h-6 w-6" />,
                  title: 'Reduce Customer Acquisition Cost',
                  desc: 'Lower CAC by 60% with AI-powered lead qualification and automated follow-ups.'
                },
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: 'Sales Automation',
                  desc: 'AI agents work 24/7 qualifying leads, scheduling meetings, and closing deals.'
                },
                {
                  icon: <Globe2 className="h-6 w-6" />,
                  title: 'Local SEO Optimization',
                  desc: 'Dominate Google Maps and local search results for your Florida market.'
                },
                {
                  icon: <Award className="h-6 w-6" />,
                  title: 'Industry Expertise',
                  desc: 'Proven success in real estate, home services, B2B, and e-commerce sectors.'
                },
                {
                  icon: <CheckCircle className="h-6 w-6" />,
                  title: 'Dedicated Support',
                  desc: 'Local Florida team ready to optimize your campaigns and maximize ROI.'
                },
              ].map((benefit, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cort-500/50 transition-colors">
                  <div className="text-cort-400 mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Florida Market Stats */}
        <section className="py-20 bg-gradient-to-r from-cort-900/20 to-purple-900/20 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: 'Florida Businesses', value: '500k+' },
                { label: 'Avg Lead Cost Saved', value: '60%' },
                { label: 'Avg Sales Growth', value: '3.5x' },
                { label: 'Client Satisfaction', value: '98%' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cort-400 mb-2">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-cort-600/20 to-purple-600/20 border border-cort-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Grow Your Florida Business?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join hundreds of successful Florida companies using Cort X AI to automate sales, generate leads, and increase revenue.
              </p>
              <Button to="/contact" variant="primary" className="text-lg px-10 py-4">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FloridaSEO;
