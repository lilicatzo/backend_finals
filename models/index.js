const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const models = {};

models.Order = require('./order')(sequelize);
models.OrderDetails = require('./orderDetails')(sequelize);

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
