/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CONTENTFUL_SPACE_ID: "repxciuckvtc",
    CONTENTFUL_ACCESS_KEY: "fXHlB98zC-MNxKjvp6Ybn4t5mm6noRmBPo7_WTzTgDE",
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
};

module.exports = nextConfig;
