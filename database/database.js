const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'dlvuokooed8qd',
    'diseoyadidluzk',
    '5070e3afd18c377b7f6977076908315d130982b9c0720c127c0a557d61e9636e',
    {        
        host: 'ec2-34-237-247-76.compute-1.amazonaws.com',
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