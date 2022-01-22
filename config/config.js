require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.DEV_DB_USER,
      "password": process.env.DEV_DB_PASS,
      "database": process.env.DEV_DB_NAME,
      "host": process.env.DEV_DB_HOST,
      "dialect": "postgres"
    },
    "test": {
      "username": "BabyJoshie",
      "password": null,
      "database": "my_videogame_list_test",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "production": {
      "username": "BabyJoshie",
      "password": null,
      "database": "my_videogame_list_production",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
}

