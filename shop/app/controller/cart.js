var Commodity = require('../models/commodity')
var Cart = require('../models/cart')
var User = require('../models/user')


exports.showCart = function(req, res) {
	Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) {
		res.render('cart',{cart:docs})
	})
}

exports.AddToCart = function(req, res) {
	Cart.findOne({"uId" : req.session.user._id, "cId": req.params.id}, function(err, doc) {
		if(doc)

			Cart.update({"uId":req.session.user._id, "cId":req.params.id},{$set : { cQuantity : doc.cQuantity + 1 }}, function(err, doc){
				if(doc>0)
					res.redirect('/')
			})
		else
			Commodity.findOne({"_id" : req.params.id}, function(err, doc) {
					Cart.create({
						uId: req.session.user._id,
						cId: req.params.id,
						cName: doc.name,
						cPrice: doc.price,
						cImgSrc: doc.poster,
						cQuantity : 1,
						cStatus : false
					}, function(error,doc) {
						if(doc)
							console.log(doc)
							res.redirect('/');
					})
			})
	})
}

exports.DelCart = function(req, res) {
	Cart.remove({"_id" : req.params.id}, function(err, doc) {
		res.redirect('/cart')
	})
}

exports.Clear = function(req, res) {
	Cart.update({"_id": req.body.cid}, {$set : {cQuantity : req.body.cnum, cStatus : true}}, function(err, doc) {
		console.log(req.body.cnum)
		if(doc > 0)
			res.redirect('/cart')
	})
}
