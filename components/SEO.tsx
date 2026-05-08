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
  keywords = 'AI sales agents, lead generation software, marketing automation USA, Google Business Profile management services, Google Maps ranking service, GBP optimization service, Google local SEO services, affordable SEO packages, small business SEO services, enterprise SEO strategy, full-service digital marketing agency, local business growth marketing, voice search optimization, conversational search SEO',
  image = 'https://www.cortxai.us/social-web.png',
  schema,
  ogType = 'website'
}) => {
  const mergedSchema = schema;

  return (
    <Helmet>
      <title>{title} | Cort X AI</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || 'https://www.cortxai.us'} />
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
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Schema Markup */}
      {mergedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(mergedSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;