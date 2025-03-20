/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['gazettengr.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'gazettengr.com',
        },
      ],
    },
  };
  
  export default nextConfig;