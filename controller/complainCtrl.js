var db = require('../config/db');

var complainCtrl = {
  getComplains: function(cb){
    const query = `select * from complain where status = 1`;
    return db.query(query, cb);
  },
  addComplain: function(objComplain, cb){
    const {userid, photo, complain_desc, complain_employee, complain_product, complain_category} = objComplain; 
    const query = `insert into complain(userid, photo, complain_desc, complain_employee, complain_product, complain_category) values(?, ?, ?, ?, ?, ?)`;
    return db.query(query,[userid, photo, complain_desc, complain_employee, complain_product, complain_category],cb);
  }
}

module.exports = complainCtrl
