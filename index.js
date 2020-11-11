const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const port = process.env.PORT || 1218;

// MIDDLEWARES
app.use(express.json());

//RUTAS
app.use('/', require('./routes/calcular.routes'));

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

http.listen(port, () => {
    console.log(`Servicio HTTP iniciado - puerto : ${port}`);
});