const express = require("express");
const mysql=require('mysql');
const bodyParser = require("body-parser");
const cors =require('cors');
const app = express();
const PORT= process.env.PORT || 3050;

var corsOptions = {
    origin: "http://localhost:8080"
  };

  app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Toon11!!',
    database:'Dinero'
});

//Rutas
app.get('/',(req,res)=>{
    res.send('Probando Api')
});

//Todos los clientes
app.get('/clientes',(req,res)=>{
    const sql = 'SELECT * FROM clientes';
    connection.query(sql,(err,resul)=>{
        if (err)throw err;
        if(resul.length>0){
            res.json(resul);
        }
        else{
            res.send('Sin resultados')
        }
    })
})

app.get('/pagos/:id',(req,res)=>{
    const {id}= req.params
    const sql=`SELECT * FROM pagos WHERE cliente=${id}`;
    console.log(sql)
    connection.query(sql, (error, result) => {
        if (error) throw error;
    
        if (result.length > 0) {
          res.json(result);
        } else {
          res.send('Not result');
        }
      });
})

app.get('/clientes/:id',(req,res)=>{
    const { id } = req.params;
    const sql = `SELECT * FROM clientes WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('Not result');
      }
    });
})


app.get('/pago/:id',(req,res)=>{
  const { id } = req.params;
  const sql = `SELECT * FROM pagos WHERE id = ${id}`;
  console.log(sql)
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
})
//
app.post('/addcliente',(req,res)=>{
    const sql = 'INSERT INTO clientes SET ?';

    const customerObj = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
    };
    console.log(customerObj)
    connection.query(sql, customerObj, error => {
      if (error) throw error;
      console.log('Prueba')
      //res.send('Customer created!');
    });

    const sql2='UPDATE'

})

app.post('/addpago',(req,res)=>{
    const sql = 'INSERT INTO pagos SET ?';

    const customerObj = {
      monto: req.body.monto,
      cliente: req.body.cliente,
    };
    console.log(customerObj)
    connection.query(sql, customerObj, error => {
      if (error) throw error;
      console.log('Prueba')
      res.send('Pago created!');
    })

})

app.post('/updatecliente2/:id',(req,res)=>{
    const { id } = req.params;
    const sql=`UPDATE clientes SET Ultimo_pago = NOW() WHERE id=${id}`;
    console.log(sql)
    connection.query(sql, error => {
      if (error) throw error;
      console.log('Fecha cambiada')
      res.send('Fecha cambiada!');
    });
});


app.post('/updatecliente/:id',(req,res)=>{
    const { id } = req.params;
    const { nombre,telefono} = req.body;
    const sql = `UPDATE clientes SET Nombre='${nombre}', Telefono='${telefono}' WHERE id=${id}`;  
    console.log(sql)
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Customer updated!');
    });
});


app.post('/updatepago/:id',(req,res)=>{
  const { id } = req.params;
  const { monto} = req.body;
  const sql = `UPDATE pagos SET monto='${monto}' WHERE id=${id}`;  
  console.log(sql)
  connection.query(sql, error => {
    if (error) throw error;
    res.send('Pago updated!');
  });
});

app.get('/deletecliente/:id',(req,res)=>{
    console.log('intentandoborrar')
    const { id } = req.params;
    const sql = `DELETE FROM clientes WHERE id= ${id}`;
    console.log('Borrando cliente '+ id)
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Delete customer');
    });
})


app.get('/deletepago/:id',(req,res)=>{
    console.log('intentandoborrar')
    const { id } = req.params;
    const sql = `DELETE FROM pagos WHERE id= ${id}`;
    console.log('Borrando pago '+ id)
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Delete pago');
    });
})

connection.connect(err=>{
    if(err) throw err;
    console.log('Database conectada');
})

app.listen(PORT,()=> console.log(`Server corriendo en el puerto ${PORT}`))

