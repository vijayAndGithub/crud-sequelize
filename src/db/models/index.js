'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../../config/dbConfig')[ env ]
const db = {};
console.log(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
/*let sequelize;
 if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[ dbConfig.use_env_variable ], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
} */
let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[ model.name ] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[ modelName ].associate) {
    db[ modelName ].associate(db);
    console.log(db[ modelName ])
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
