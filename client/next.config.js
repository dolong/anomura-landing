const { DEEPSEACHALLENGER_HOST } = process.env;
module.exports = {
    webpack: (config) => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    },
    swcMinify: true,

    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/public/PrivacyPolicy.html",
                destination: "/pages/api/static/home/privacyPolicy.js",
            },
            {
                source: "/public/CCPANotice.html",
                destination: "/pages/api/static/home/ccpaNotice.js",
            },
            {
                source: "/public/TERMSANDCONDITIONS.html",
                destination: "/pages/api/static/home/termsAndConditions.js",
            },
            {
                source: "/public/mediakit.html",
                destination: "/pages/api/static/home/mediakit.js",
            },
            // rewrite to Deep Sea Challenger
            {
                source: "/:path*",
                destination: `/:path*`,
            },
            {
                source: "/challenger",
                destination: `${DEEPSEACHALLENGER_HOST}/challenger`,
            },
            {
                source: "/challenger/:path*",
                destination: `${DEEPSEACHALLENGER_HOST}/challenger/:path*`,
            },
            {
                source: "/challenger(.*)",
                destination: `${DEEPSEACHALLENGER_HOST}/challenger$1`,
            },
        ];
    },
};
