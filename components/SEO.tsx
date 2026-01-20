import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  image?: string;
  schema?: object;
  ogType?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  keywords = 'AI sales agents, lead generation, local SEO, marketing automation, Florida',
  image = 'https://cort-xai-vs-mon4.vercel.app/og-image.png',
  schema,
  ogType = 'website'
}) => {
  // Default Organization Schema
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cort X AI',
    url: 'https://cort-xai-vs-mon4.vercel.app',
    logo: 'https://cort-xai-vs-mon4.vercel.app/logo.png',
    description: 'AI-powered sales agents and lead generation platform for USA businesses',
    sameAs: [
      'https://facebook.com/cortxai',
      'https://twitter.com/cortxai',
      'https://linkedin.com/company/cortxai'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3230 Palm Ave Suite B',
      addressLocality: 'Hialeah',
      addressRegion: 'FL',
      postalCode: '33012',
      addressCountry: 'US'
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Florida'
      },
      {
        '@type': 'Country',
        name: 'United States'
      }
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+1-305-426-7663',
      email: 'daniel@cortxai.us'
    }
  };

  const mergedSchema = schema || defaultSchema;

  return (
    <Helmet>
      <title>{title} | Cort X AI</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || 'https://cort-xai-vs-mon4.vercel.app'} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Cort X AI" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@cortxai" />
      
      {/* Additional SEO */}
      <meta name="author" content="Cort X AI" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="google-site-verification" content="your-google-verification-code" />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Locale */}
      <link rel="alternate" hrefLang="en-US" href="https://cort-xai-vs-mon4.vercel.app" />
      
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(mergedSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;