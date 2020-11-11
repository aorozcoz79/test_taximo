const Datos = require('../models/Datos');

const control = {

    calcular: async (req, res) => {
   
        try {
            console.log('Entro al metodo calcular');
            datos = req.body

            const rspFind = await control.getByFind(datos)
            console.log('Resultado Find');
            console.log(rspFind);
            if(rspFind) {
                return res.send({status:true, data:rspFind })
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
            console.log('Entro al buscar');
            const { parameters, shoping_centers, roads } = datos
            const dato = await Datos.findOne({
                where: {
                    parameters, shoping_centers, roads
                }
            })
            console.log(dato);              
            return dato
        } catch (e) {
            console.log(e);
        }
    },

    // Obtiene el tiempo minimo de la matriz dada
    minimum_time: async (datos) => {
        try {
            console.log('Entro a Calcular');
            datos.minimum_time = 50
            return await control.create(datos)
        } catch (e) {
            
        }
    },

    // Almacena en BD el resultado obtenido
    create: async (datos) => {
        try {
            console.log('Entro a Crear registro');
            console.log(datos);
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
                    data: newDatos                    
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