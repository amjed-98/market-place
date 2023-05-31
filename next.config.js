const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'lazzaro.io',
      'lazzaro-boutique-pre.s3.eu-west-2.amazonaws.com',
      'lazzaro-boutique-prod.s3.eu-central-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
