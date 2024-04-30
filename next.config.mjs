/** @type {import('next').NextConfig} */

// export const nextConfig = {};

export const nextConfig = {
    reactStrictMode: true,

    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "*.googleusercontent.com",
        //         port: "",
        //         pathname: "**",
        //     },
        // ],
        domains: ['lh3.googleusercontent.com'],
    },
    // webpack(config) {
    //     config.experiments = {
    //         ...config.experiments,
    //         topLevelAwait: true
    //     }
    //     return config
    // }
};






// module.exports = nextConfig