const {jwt_signin} = require('../config/jwt')
var db = require('../config/db');

const loginCtrl = (req, res)=>{
	console.log(req.body)
	if(!req.body || !req.body.email || !req.body.password) {
		res.json({status: 0, msg: "email, password is required."})
	} else {
		const {email, password} = req.body;
		db.query("Select * from users where useremail = ? and userpassword = ?", [email, password], (err,rows)=>{
			if(err){
				console.log(err);
				res.json({
			    	status: 0,
			    	msg: "email or password is incorrect"
			  	});
			}else{
				if(rows.length){
					const {userid} = rows[0];
					const query = `select
							   u.userid,
							   u.useremail,
							   u.usertype,
							   p.display_name,
							   p.father_name,
							   p.mother_name,
							   p.gender as gender_id,
							   g.name as gender,
							   p.dob,
							   p.profile_image,
							   u.deptt_id,
							   d.name as department,
							   u.country_id,
                                                        
                                                           dp.name as designation,   
							   c.country_name as country
							from users u
							join profile p
							   on u.userid = p.user_id
							join gender g
							   on p.gender = g.genderid
							join department d
							   on u.deptt_id = d.depttid
							join country c
							   on u.country_id = c.countryid
							join designations dp
							   on p.designation = dp.designation_id
							where u.userid = ?`;
					//console.log(query);
					db.query(query, [userid], (errin, uds) => {
					  	if(errin){
							console.log(errin);
						}else{
 							jwt_signin(req, res, uds[0]);
						}
					});
					/*const user = rows[0];
					const objUser = {
						userid: user.userid,
					  	useremail: user.useremail,
					  	country_id: user.country_id,
						deptt_id: user.deptt_id,
						//userpassword: user.userpassword,
					  	usertype: user.usertype
					  	//created_date: user.created_date,
					  	//updated_date: user.updated_date,
					  	//status: user.status
					}
					jwt_signin(req, res, objUser)*/
				}else{
					res.json({
				    	status: 0,
				    	msg: "email or password is incorrect"
				  	});
				}
			}
		});
	}
}
module.exports = { loginCtrl }
