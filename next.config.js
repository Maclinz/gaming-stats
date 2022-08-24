/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ["media.rawg.io"]
  },
  publicRuntimeConfig:{
    REACT_APP_KEY: 'ffda643b2ac4472e95091e3b2fdc48a4'
  }
}

module.exports = nextConfig
