const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'test_taximo',
    'taximo_pg',
    '123456',
    {        
        host: '35.238.242.156',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)

module.exports = sequelize;