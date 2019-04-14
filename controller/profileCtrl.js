var db = require('../config/db');

var profileCtrl = {
  updateProfile: function(userObj, cb){
    const {userid, gender, display_name, father_name, mother_name, dob, profile_image} = userObj;
    const query = `update profile 
                   	set gender = ? 
		   	and display_name = ?
		   	and father_name = ? 
			and mother_name = ? 
			and dob = ? 
			and profile_image = ?
		   where userid = ?`;
    return db.query(query, [gender, display_name, father_name, mother_name, dob, profile_image, userid], cb);
  }
};

module.exports = {profileCtrl}
