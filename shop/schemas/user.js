var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10
var UserSchema = ({
	name : {
		unique : true,
		type  : String
	},
	password : String,
	role : {
		type : Number,
		default : 0
		/* role > 0 means can admin*/
	},
	meta : {
		/*the time when you update*/
		createAt : {
			type : Date,
			default : Date.now()
		} ,
		updateAt : {
			type : Date,
			default : Date.now()
		}
	}
})
/*every event 'save' record that time*/
UserSchema.pre('save',function(next){
	var user=this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		console.log('-----------------------')
		if(err) return next(err);
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return next(err)
			user.password = hash
			console.log('-----------------------',user.password)
			next()
		})
	})
})
UserSchema.methods={
	comparePassword : function(_password, cb){
		bcrypt.compare(_password, this.password, function(err, isMatch){
			if(err){
				return cb(err)
			}
			cb(null, isMatch)
		})
	}
}
UserSchema.statics={
	fetch : function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById : function(id,cb){
		return this
		.findOne({_id : id})
		.exec(cb)
	}
}
module.exports = UserSchema