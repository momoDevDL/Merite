require('dotenv').config()

export default {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "merite_development",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "define": {
            "timestamps": false
        }
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "merite_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "define": {
            "timestamps": false
        }
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "merite_production",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "define": {
            "timestamps": false
        }
    }
}