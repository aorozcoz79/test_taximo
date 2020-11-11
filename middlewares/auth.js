const sha256 = require('sha256');

module.exports = {
    authToken: (req, res, next) => {

        let usuario = req.headers['username']
        let checksum = sha256(usuario)
        
        console.log('Entro al Middleware para verificar el acceso');

        console.log(usuario);
        if (usuario == 'taximo_api_user' && checksum == sha256('taximo_api_user')) {
            next();
        } else {
            return res.status(401).send({
                status: false,
                error: "Es necesario que el usuario y el password sean validos"
            })
            
        }

    },
   
};