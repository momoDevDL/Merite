export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Mérite',
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
    plugins: [
        { src: '~/plugins/maz.js', mode: 'client' },
        { src: '~/plugins/mask.js', mode: 'client' },
        { src: '~/plugins/scrollbar.js', mode: 'client' }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)


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
        baseURL: 'http://localhost:3001/api/'
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    buildModules: ['@nuxtjs/vuetify'],

    auth: {
        strategies: {
            student: {
                scheme: "local",
                endpoints: {
                    login: {
                        url: "/user/login",
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: false,
                    user: {
                        url: "/test",
                        method: 'get',
                        propertyName: 'user'
                    },
                },
                redirect: {
                    login: '/login',
                    logout: '/login',
                    callback: false,
                    home: '/'
                }
                // tokenRequired : true,
                // tokenType: 'bearer'
            },
            admin: {
                scheme: "local",
                endpoints: {
                    login: {
                        url: "/user/login",
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: false,
                    user: false
                },
                redirect: {
                    login: '/admin/login',
                    logout: '/admin/login',
                    callback: false,
                    home: '/admin'
                }
                // tokenRequired : true,
                // tokenType: 'bearer'
            },
        },

    }

}