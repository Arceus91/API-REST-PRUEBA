const express = require('express');
const app = express();
const cors = require('cors');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middles
app.use(express.json());
app.use(cors())

//Modulos
app.use(require('./modulos/rutas'));

// inicializar Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en puerto',app.get('port'));
});