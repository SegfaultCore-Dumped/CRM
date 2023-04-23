module.exports = {
    development: {
      username: 'root',
      password: 'root',
      database: 'stocky',
      host: 'mysql',
      dialect: 'mysql'
    },
    test: {
      username: 'root',
      password: 'root',
      database: 'stocky',
      host: 'mysql',
      dialect: 'mysql'
    },
    production: {
      username: 'root',
      password: 'root',
      database: 'stocky',
      host: 'mysql',
      dialect: 'mysql'
    }
  }

// module.exports = {
//   PORT: process.env.PORT,

//   /** DATABASE */
//   db: {
//       DB_HOST: process.env.DB_HOST,
//       DB_USER: process.env.DB_USER,
//       DB_PASS: process.env.DB_PASS,
//       DB_NAME: process.env.DB_NAME,
//       dialect: "mysql",

//       pool: {
//           max: 5,
//           min: 0,
//           acquire: 30000,
//           idle: 10000
//       }
//   }
// };
  