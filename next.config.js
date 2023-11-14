// added this because trading view featured chart lib
// is an esm and webpack is upset
const withPlugins = require("next-compose-plugins");
// const withTM = require('next-transpile-modules')(['./public/charting_library'])
// const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  // runtime: "experimental-edge"
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.kitco.favish.com",
      },
    ],
    domains: [
      "image-api.dev.kitco.com",
      "kitco-cms-dev.storage.googleapis.com",
      "storage.googleapis.com",
      "kitco-images-resize-cdn.favish.workers.dev",
      "images.edge-kitco.com",
      "xsgames.co", // only for dev and test images
      "www.kitco.com",
      "kitco-pages.nvhoan9116667.workers.dev",
      "cryptocompare.com"
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/charts/:path*",
        destination: "http://www-origin.kitco.com/:path*",
      },
      {
        source: "/iframe/collective-mining.html",
        destination: "https://www.kitco.com/iframe/silver-mining-banner.html",
      },
      {
        source: "/css/kitco.home.min.css",
        destination: "https://www.kitco.com/css/kitco.home.min.css",
      },
      {
        source: "/jscripts/ajax_call.js",
        destination: "https://www.kitco.com/jscripts/ajax_call.js",
      },
      {
        source: "/jscripts/kitco.home.min.js",
        destination: "https://www.kitco.com/jscripts/kitco.home.min.js",
      },
      {
        source: "/images/KGX/kgx_arrows.gif",
        destination: "https://www.kitco.com/images/KGX/kgx_arrows.gif",
      },
      {
        source: "/iframe/scrapit/:path*",
        destination: "https://www.kitco.com/iframe/scrapit/:path*",
      },
      {
        source: "/services/cpm-group-signals",
        destination: `${process.env.NEXT_PUBLIC_CDN_PAGE}/services/cpm-group-signals`,
      },
    ];
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=1260, s-maxage=1260, stale-while-revalidate=1260",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// module.exports = withPreact({ ...nextConfig })
// module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
