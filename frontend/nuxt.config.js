export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'frontend',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    router: {
        middleware: 'auth',
        base: '/'
    },

    env: {
        maxAge: 60 * 60 * 60
    },


    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: ['@nuxtjs/tailwindcss'],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        'cookie-universal-nuxt',
        '@nuxtjs/auth-next',
        '@nuxtjs/toast'
    ],
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:3001/api/',
    //         pathRewrite: {
    //             '^/api': '/'
    //         }
    //     }
    // },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: 'http://localhost:3002/api/'
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "/user/login",
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: {
                        url: "/testLogout",
                        method: 'delete'
                    },
                    user: {
                        url: "/user/me",
                        method: 'get',
                        propertyName: 'user'
                    },
                },
                // tokenRequired : true,
                // tokenType: 'bearer'
            }
        },
        redirect: {
            login: '/login',
            logout: '/login',
            callback: false,
            home: '/'
        }
    }

}