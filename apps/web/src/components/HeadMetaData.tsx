import React from 'react';
import Head from 'next/head';

export const HeadMetaData: React.FC<{
  title?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  pathname?: string;
}> = ({
  title = 'Suplemen belajar lo, buat ilmu tech industry.',
  metaDescription,
  ogImageUrl = 'https://cdn.discordapp.com/attachments/1050790741334569091/1151943122117480558/V6_Academy_Banner_Assets.png',
  pathname = '',
}) => {
  const defaultTitle = 'V6 Academy';

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://v6-academy.com';

  const pageUrl = new URL(pathname, baseUrl).toString();

  return (
    <Head>
      <title>{title + ' | ' + defaultTitle}</title>

      {/* metadata */}
      <meta name="title" content={title + ' | ' + defaultTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:title" content={title + ' | ' + defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title + ' | ' + defaultTitle} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="twitter:description" content={metaDescription} />
    </Head>
  );
};
