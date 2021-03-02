// This does not support nested pages (level 2 and up)
// If you're working with deeply nested pages, remove this or rework it.

export default ({
  location,
  canonical,
  siteUrl,
  pageTitle,
  siteTitle,
  pageTitleFull,
}) => {
  const isSubPage = pageTitle && location.pathname !== '/';

  const schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      alternateName: pageTitleFull,
      name: pageTitle || siteTitle,
      url: canonical,
    },
  ];

  if (isSubPage) {
    schema.push({
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          item: {
            '@id': siteUrl,
            name: siteTitle,
          },
          position: 1,
        },
        {
          '@type': 'ListItem',
          item: {
            '@id': canonical,
            name: pageTitle,
          },
          position: 2,
        },
      ],
    });
  }

  return schema;
};
