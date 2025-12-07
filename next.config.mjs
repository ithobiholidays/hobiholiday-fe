/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "145.79.13.228",
      },
      {
        protocol: "https",
        hostname: "backend.hobiholidays.my.id",
      },
      {
        protocol: "https",
        hostname: "be.hobiholidays.com",
      },
      {
        protocol: "http",
        hostname: "145.79.13.228:5050",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_DATABASE_URL: "https://be.hobiholidays.com",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/cpanel",
        destination: "https://cpanel.hobiholidays.com",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
