const express = require('express');
const res = require('express/lib/response');
const modulo = express.Router();

const mysqlConnection = require('../conexion')

modulo.get('/usuarios',(req, res) => {
    mysqlConnection.query('SELECT * FROM apidb.usuarios', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        }
        else{
            console.log(err);
        }
    });
});

modulo.get('/ubicaciones',(req, res) => {
    mysqlConnection.query('SELECT * FROM apidb.ubicaciones', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        }
        else{
            console.log(err);
        }
    });
});

modulo.get('/usuarios/:id', (req, res) =>{
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM apidb.usuarios WHERE id = ?', [id], (err,rows,fields) =>{
        if(!err){
            res.json(rows[0])
        }
        else{
            console.log(err);
        }
    });
});

modulo.get('/ubicaciones/:usuario', (req, res) =>{
    const { usuario } = req.params;
    mysqlConnection.query('SELECT id FROM apidb.usuarios WHERE usuario = ?', [usuario], (err,rows,fields) =>{
        if(!err){
            res.json(rows[0])
        }
        else{
            console.log(err);
        }
    });
});

modulo.get('/lugares/:id_usuario',(req, res) => {
    mysqlConnection.query('select u.usuario, ub.latitud, ub.longitud from usuarios u, ubicaciones ub where u.id = ub.id_usuario and ub.id_usuario =1;', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        }
        else{
            console.log(err);
        }
    });
});


modulo.post('/usuarios', (req, res) => {
    const {id,nombre,usuario,contraseña} = req.body;
    console.log(req.body);

    const query= 'CALL ingresoUsuarios(?,?,?,?);';
    mysqlConnection.query(query, [id,nombre,usuario,contraseña],(err,rows,fields) =>
    {
        if(!err){
            res.json({Status: 'Usuario Registrado'})
           mysqlConnection.commit();
        }
        else{
            console.log('No insertado ',err);
            mysqlConnection.rollback();
        } 
    });
});

modulo.post('/ubicaciones', (req, res) => {
    const {id,id_usuario,latitud,longitud} = req.body;
    console.log(req.body);
    const query= 'CALL ingresoUbicaciones(?,?,?,?);';
    mysqlConnection.query(query, [id,id_usuario,latitud,longitud],(err,rows,fields) =>
    {
        if(!err){
            res.json({Status: 'Ubicacion Registrada'})
           mysqlConnection.commit();
        }
        else{
            console.log('No insertado ',err);
            mysqlConnection.rollback();
        } 
    });
});

modulo.put('/usuarios/:id', (req, res) => {
    const {nombre,usuario,contraseña} = req.body;
    const {id}= req.params;
    const query= 'CALL ingresoUsuarios(?,?,?,?);';
    mysqlConnection.query(query, [id,nombre,usuario,contraseña],(err,rows,fields) =>
    {
        if(!err){
            
            res.json({Status: 'Usuario Actualizado'})
            mysqlConnection.commit();
        }
        else{
            console.log('No Actualizado ',err);
            mysqlConnection.rollback();
        } 
    });
});

modulo.delete('/usuarios/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE id = ?', [id], (err,rows,fields)=>{
        if(!err){
            res.json({Status: 'Usuario Eliminado'})
            mysqlConnection.commit();
        }
        else{
            console.log('No Eliminado ',err);
            mysqlConnection.rollback();
        } 
    });
});

module.exports = modulo;

