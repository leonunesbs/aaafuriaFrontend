const SiteMap: any = () => {
  return `
      <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://aaafuria.com.br</loc>
                <lastmod>2020-09-03</lastmod>
                <changefreq>weekly</changefreq>
            </url>
            <url>
                <loc>https://aaafuria.com.br/loja</loc>
                <lastmod>2020-09-03</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https://aaafuria.com.br/sejasocio</loc>
                <lastmod>2020-09-03</lastmod>
                <changefreq>monthly</changefreq>
            </url>
        </urlset>
      `
}

export default SiteMap
