const express = require('express');
const exphbs = require('express-handlebars');
const { authToken } = require('./middlewares/auth');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const port = process.env.PORT || 1218;

// MIDDLEWARES
app.use(express.json());
//RUTAS DE PAGINA HOME
app.use('/', require('./routes/pagina.routes'));



//CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// VIEWS
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//RUTAS API
app.use([authToken]);
app.use('/api/v1/', require('./routes/calcular.routes'));


http.listen(port, () => {
    console.log(`Servicio HTTP iniciado - puerto : ${port}`);
});