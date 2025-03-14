import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
          { 
            protocol: "https", 
            hostname: "api.qrserver.com",
            pathname: '/v1/create-qr-code/**'
          },
        ]
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);