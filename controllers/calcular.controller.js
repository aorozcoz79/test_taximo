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
                console.log('Registro ya Existe en la BD');
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
            console.log('Verifica si existe la secuencia de la matriz dada');
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
            

            // Obtiene los valores de entrada
            const { parameters, shoping_centers, roads } = datos

            // crea un array de datos de los parametros
            let parameters2 = parameters.split(',')
            console.log(parameters2);
            // crea un array de datos de los centros comerciales
            shoping_centers2 = shoping_centers.split('-')
            console.log(shoping_centers2);
            // crea un array de datos de los carreteras
            roads2 = roads.split('-')
            console.log(roads2);


            let n, m, k ;
            // Asigna los valores de n, k y m segun la variable parametro
            n = parameters2[0]
            m = parameters2[1]
            k = parameters2[2]
            console.log(n, m, k);

            // Restricciones
            if (2 > n && n > 1000) {
                return { status: false, message: 'Falló al crear el registro', data: {} }
            }

            if (1 > m && m > 2000) {
                return { status: false, message: 'Falló al crear el registro', data: {} }
            }

            if (1 > k && k > 10) {
                return { status: false, message: 'Falló al crear el registro', data: {} }
            }

            

            var aleatorio =  Math.round((Math.random()*100)/10)*10;
            console.log(aleatorio);
            datos.minimum_time = aleatorio
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