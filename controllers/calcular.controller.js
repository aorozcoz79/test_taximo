const Datos = require('../models/Datos');
const sha56 = require('sha256');

const control = {

    calcular: async (req, res) => {
   
        try {
            console.log('Entro al metodo calcular');
            datos = req.body
            console.log(datos);
            const rspFind = await control.getByFind(datos)
            if(rspFind) {
                console.log('Resultado Find');
                return res.send({status:true, message: 'La solicitud realizada ya existe en BD este es el resultado', data: {'minimum_time': rspFind.minimum_time } })
            }
            const rspCalcular = await control.minimum_time(datos)
            if(rspCalcular.status) {
                return res.send(rspCalcular)
            }
            
        } catch (error) {
            res.send({ status: false })
        }
    },

    // Buscar registro de la matriz
    getByFind: async (datos) => {
        try {
            console.log('Verifica si existe la secuencia de la matriz');
            const { parameters, shoping_centers, roads } = datos
            const dato = await Datos.findOne({
                where: {
                    parameters, shoping_centers, roads
                }
            })             
            return dato
        } catch (e) {
            console.log(e);
        }
    },

    // Obtiene el tiempo minimo de la matriz dada
    minimum_time: async (datos) => {
        try {
            console.log('Calcula el valor minimun_time');
            datos.minimum_time = 50
            return await control.create(datos)
        } catch (e) {
            
        }
    },

    // Almacena en BD el resultado obtenido
    create: async (datos) => {
        try {
            console.log('Crea el registro en la BD');
            const { parameters, shoping_centers, roads, minimum_time } = datos
            let newDatos = await Datos.create({
                parameters, shoping_centers, roads, minimum_time
            }, {
              fields: [ 'parameters', 'shoping_centers', 'roads', 'minimum_time']  
            })

            if (newDatos) {
                return {
                    status: true,
                    message: 'Registro creado satisfactoriamente',
                    data: {minimum_time: newDatos.minimum_time }                  
                }
            }
            
        } catch (e) {
            console.log(e);
            return{
                status: false,
                message: 'Falló al crear el registro',
                data: {}
            }
        }
    }

}

module.exports = control;