const config = require("../config/config.js");
const {
    Sequelize,
    DataTypes,
    Op
} = require("sequelize");

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password, {
        host: config.development.host,
        dialect: config.development.dialect,

    }
);

// const sequelize = new Sequelize(
//     config.db.DB_NAME,
//     config.db.DB_USER,
//     config.db.DB_PASS, {
//         host: config.db.DB_HOST,
//         dialect: config.db.dialect,

//         poll: {
//             max: config.db.pool.max,
//             min: config.db.pool.min,
//             acquire: config.db.pool.acquire,
//             idle: config.db.pool.idle
//         }
//     }
// );

const db = {};
var initModels = require("./init-models.js");

db.models = initModels(sequelize);
db.Op = Op;

module.exports = db;