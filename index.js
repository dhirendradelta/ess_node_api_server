const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan      = require('morgan');
const PORT = 3000;
const app = express(); 

app.use(morgan('dev'));
//app.use(bodyParser({limit: '50mb'}));
//app.use(cors());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With, access-token');
  if(req.method == 'OPTIONS'){
    return res.send(200);
  }else{
    return next();
  }
});
app.use(bodyParser.urlencoded({ limit: '40mb', parameterLimit: 100000, extended: true }));
app.use(bodyParser.json({limit: '40mb'}));
app.use(express.static('public'))

require('./routes/index')(app);

app.listen(PORT,()=>{
 console.log('server is running on port '+PORT) 
});
