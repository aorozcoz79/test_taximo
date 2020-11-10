const sql = require('pg');

const control = {

    async send(req, res) {
        try {

            
            res.send({ status: true, data: response })
            
        } catch (error) {
            res.send({ status: false })
        }
    }

}
module.exports = control;