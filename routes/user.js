const express = require('express');
const {jwt_auth} = require('../middleware/index');
const { loginCtrl } = require('../controller/loginCtrl')
const { profileCtrl } = require('../controller/profileCtrl.js');
const apiRoutes = express.Router();

apiRoutes.post('/login', loginCtrl)

apiRoutes.put("/profile", jwt_auth, (req, res) => {
  const {userid, dob, display_name, father_name, mother_name, gender_id} = req.body;
  const userobj = {
    userid: userid, 
    display_name: display_name,
    father_name: father_name,
    mother_name: mother_name,
    gender: gender_id,
    dob: dob
  }
  profileCtrl.updateProfile(userobj, function(err, count){
    if(err){
      res.status(500).json({status:0, msg: err});
    }else{
      res.status(200).json({status:1, msg: "profile updated."});
    }
  });
});

module.exports = { apiRoutes }
