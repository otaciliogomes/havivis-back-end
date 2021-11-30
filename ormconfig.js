module.exports = {
    "type": "mysql",
    "host": process.env.HOST_DB_QA,
    "port": 3306,
    "username": process.env.USER_DB_QA,
    "password": process.env.PASSWORD_DB_QA,
    "database": process.env.DATABASE_DB_QA,
    "synchronize": false,
    "logging": false,
    "entities": [
      process.env.NODE_ENV === 'production' ? 'dist/entities/**/*.js': 'src/entities/**/*.ts'
    ],
    "migrations": [
      process.env.NODE_ENV === 'production' ? 'dist/database/migrations/*.js': 'src/database/migrations/*.ts'
    ],
    "subscribers": [
      process.env.NODE_ENV === 'production' ? 'dist/subscriber/**/*.js': 'src/subscriber/**/*.ts'
    ],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}
