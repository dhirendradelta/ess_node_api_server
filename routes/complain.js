const express = require('express');
const {jwt_auth} = require('../middleware/index');
const {jwt_decode} = require('../config/jwt');
const {getComplains, addComplain} = require('../controller/complainCtrl');

const apiRoutes = express.Router();

apiRoutes.get('/', jwt_auth, (req, res) => {
  getComplains(function(err, rows){
    if(err){
      res.status(500).json({status:0, msg: err});
    }else{
      res.status(200).json({status: 1, complains: rows});
    }
  })
});

apiRoutes.post('/', jwt_auth, (req, res) => {
  const userdata = jwt_decode(req);
  var errors = [];
  const {photo, complain_desc, complain_employee, complain_product, complain_category} = req.body;
  if(photo == null){
    errors.push("please provide pic");
  }
  if(complain_desc == null || complain_desc.length == 0){
    errors.push("please provide desc");
  }
  if(complain_employee == null || complain_employee.length == 0){
    errors.push("please provide complain employee");
  }
  if(complain_product == null || complain_product.length == 0){
    errors.push("please provide complain product");
  }
  if(complain_category == null || complain_category.length == 0){
    errors.push("please provide complain category");
  }

  if(errors.length){
    res.status(500).json({status:0, msg: errors});
  }else{
    const complainObj = {userid: userdata.userid, photo: photo, complain_desc: complain_desc, complain_employee: complain_employee, complain_category: complain_category, complain_product: complain_product};
    addComplain(complainObj, function(err, count){
      if(err){
        res.status(500).json({status:0, msg: err });
      }else{
        res.status(200).json({status:1, msg: 'complain created'});
      }
    });
  }
});


module.exports = {apiRoutes}
