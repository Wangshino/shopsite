var mongoose = require('mongoose')
var Schema=mongoose.Schema
var CartSchema=new Schema({
	uId: String,
	cId: String,
	cName: String,
	cPrice: String,
	cImgSrc:String,
	cQuantity: Number,
	cStatus: {
		type: Boolean,
		default: false
	}
})
CartSchema.statics = {
	fetch : function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById : function(id, cb){
		return this
		.findOne({_id : id})
		.exec(cb)
	}
}
module.exports=CartSchema
