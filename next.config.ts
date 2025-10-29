import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'export',
  distDir: 'dist',
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/MaplestoryHelper',
        destination: '/MaplestoryHelper/Roster',
        permanent: true
      }
    ];
  }
}

export default nextConfig;
