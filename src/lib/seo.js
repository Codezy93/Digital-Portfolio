// lib/seo.js
// Reusable SEO helpers for a Next.js App Router project (JS version)
// - Drop this file under /lib/seo.js
// - See usage notes at the bottom

/* ========================
   1) Site constants
   ======================== */
export const SITE = {
  name: "Viraj Paradkar — AI/ML",
  url: "https://yourdomain.com", // ← change to your real domain (https://...) with NO trailing slash
  description:
    "MS in AI @ Northeastern. AI/ML engineer building production‑grade, research‑driven systems and polished developer UX.",
  author: {
    name: "Viraj Paradkar",
    handle: "Codezy93",
    email: "your.email@example.com", // ← update
  },
  social: {
    github: "https://github.com/Codezy93",
    linkedin: "https://www.linkedin.com/in/viraj-paradkar/",
    x: "https://x.com/Codezy93",
    // add more if you like: kaggle, medium, scholar
  },
  defaultImage: "/og.png", // place a 1200x630 image at public/og.png
  keywords: [
    "Viraj Paradkar",
    "Codezy93",
    "Northeastern University",
    "MS in AI",
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "GNN",
    "Next.js Portfolio",
  ],
};

export const absoluteUrl = (path = "") => new URL(path, SITE.url).toString();

/* ========================
   2) Base <Metadata> for app/layout.js
   ======================== */
export const baseMetadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: SITE.name,
    template: `%s • ${SITE.author.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: SITE.author.name, url: SITE.url }],
  creator: SITE.author.name,
  publisher: SITE.author.name,
  alternates: {
    canonical: SITE.url,
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.name,
    siteName: SITE.name,
    description: SITE.description,
    images: [{ url: SITE.defaultImage, width: 1200, height: 630 }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SITE.author.handle}`,
    creator: `@${SITE.author.handle}`,
    title: SITE.name,
    description: SITE.description,
    images: [SITE.defaultImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    // google: "<paste-search-console-code>",
    // other providers if needed
  },
};

/* ========================
   3) Per‑page metadata factory
   ======================== */
export function pageMetadata({
  title = SITE.name,
  description = SITE.description,
  path = "/",
  image = SITE.defaultImage,
  type = "article", // or "website"
  publishedTime,
  modifiedTime,
  tags = [],
} = {}) {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      siteName: SITE.name,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: `@${SITE.author.handle}`,
      site: `@${SITE.author.handle}`,
    },
  };
}

/* ========================
   4) JSON‑LD helpers (Schema.org)
   ======================== */
export function jsonLdPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.author.name,
    url: SITE.url,
    image: absoluteUrl("/avatar.jpg"), // optional avatar
    sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.x].filter(Boolean),
    jobTitle: "AI/ML Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Northeastern University",
    },
  };
}

export function jsonLdWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={query}`,
      "query-input": "required name=query",
    },
  };
}

export function jsonLdBreadcrumb(items = [
  { name: "Home", item: "/" },
]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.item),
    })),
  };
}

/* ========================
   5) <JsonLd /> component
   ======================== */
export function JsonLd({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function DefaultJsonLd() {
  const site = jsonLdWebSite();
  const person = jsonLdPerson();
  return (
    <>
      <JsonLd schema={site} />
      <JsonLd schema={person} />
    </>
  );
}

/* ========================
   6) robots & sitemap (paste into their own files)
   ======================== */
// app/robots.js
// export default function robots() {
//   return {
//     rules: [{ userAgent: "*", allow: "/" }],
//     sitemap: absoluteUrl("/sitemap.xml"),
//     host: SITE.url,
//   };
// }

// app/sitemap.js
// export default function sitemap() {
//   const now = new Date();
//   return [
//     { url: SITE.url, lastModified: now },
//     { url: absoluteUrl("/projects"), lastModified: now },
//     { url: absoluteUrl("/skills"), lastModified: now },
//     // add more routes as needed
//   ];
// }

/* ========================
   7) Usage (do NOT keep these comments in prod)
   ======================== */
// 1) In app/layout.js
// import { baseMetadata, DefaultJsonLd } from "@/lib/seo";
// export const metadata = baseMetadata;
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <DefaultJsonLd />
//         {children}
//       </body>
//     </html>
//   );
// }
//
// 2) Per page (App Router)
// // app/(site)/projects/page.js
// import { pageMetadata } from "@/lib/seo";
// export const metadata = pageMetadata({
//   title: "Projects",
//   description: "Selected AI/ML projects and case studies.",
//   path: "/projects",
// });
//
// 3) For a detailed project/article page
// export const metadata = pageMetadata({
//   title: project.name,
//   description: project.summary,
//   path: `/projects/${project.slug}`,
//   image: project.ogImage || "/og.png",
//   type: "article",
//   publishedTime: project.publishedAt,
//   modifiedTime: project.updatedAt,
//   tags: project.tags,
// });
