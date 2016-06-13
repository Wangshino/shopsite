var _ = require('underscore')
var Commodity = require('../models/commodity')
var Category = require('../models/category')
var Comment = require('../models/comment')
var Eventproxy = require('eventproxy')
var fs=require('fs')
var path=require('path')
exports.detail = function(req, res) {
	var id = req.params.id;
		Commodity.findById(id, function(err, commodity) {
		//对访客查看统计
			Commodity.update({_id : id}, {$inc :{pv : 1}}, function(err){
				if(err)  console.log(err)
			})
		})
	var id = req.params.id
	Commodity.findById(id, function(err, commodity) {
		Comment
			.find({commodity : id})
			.populate('from', 'name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err, comments) {
				console.log(comments)
				res.render('detail', {
					title : 'Details',
					commodity : commodity,
					comments : comments
				})
			})
	})
}

exports.new = function(req, res) {
	Category.find({}, function(err, categories) {
		res.render('admin', {
			title : 'admin new',
			categories : categories,
			commodity : {}
		})
	})
}

exports.save = function(req, res) {
	var id= req.body.commodity._id
	var commodityObj= req.body.commodity
	var _commodity

	if(req.poster)
		commodityObj.poster = req.poster

	if(id) {
		Commodity.findById(id, function(err, commodity) {
			if(err)
				console.log(err)

			_commodity = _.extend(commodity, commodityObj)
			_commodity.save(function(err, commodity) {
				if(err)
					console(err)

				res.redirect('/shop/'+ commodity._id)
			})
		})
	}else {
		_commodity= new Commodity(commodityObj)
		var categoryId = _commodity.category
		_commodity.save(function(err, commodity) {
			if(err)
				console.log(err)
			Category.findById(categoryId, function(err, category) {
				category.commodity.push(commodity._id)

				category.save(function(err, category) {
					res.redirect('/shop/'+ commodity._id)
				})
			})
		})
	}
}
exports.list = function (req, res) {
	Commodity.fetch(function(err, commodity) {
		if(err)  console.log(err)

		res.render('list', {
			title : 'list',
			commodity : commodity
		})
	})
}

exports.del = function(req, res) {
	var id = req.query.id

	if(id) {
		Commodity.remove({
			_id : id
		}, function(err, commodity) {
			if(err)  console.log(err)
			else
				res.json({
					sucess : 1
				})
		})
	}
}

exports.deluser = function(req, res) {
	var id = req.query.id

	if(id) {
		User.remove({
			_id : id
		}, function(err, user) {
			if(err)  console.log(err)
			else
				res.json({
					sucess : 1
				})
		})
	}
}
exports.update = function(req, res) {
	var id = req.params.id
	console.log(id)

	if(id)
		Commodity.findById(id, function(err, commodity) {
			Category.find({}, function(err, category) {
				res.render('admin', {
					title : 'admin update',
					commodity : commodity,
					categories : category
				})
			})
		})
}
//admin poster upload
//保存上传海报（海报保存成功后再对电影信息保存，当上传附件过大的时候可能影响整体速度，
//最好是在电影分类保存的时候讲上传海报地址传递过去（此时可能不能使用multipart）
exports.savePoster=function(req,res,next) {
	var posterData=req.files.uploadPoster
	var filePath=posterData.path
	var originalFilename=posterData.originalFilename
	console.log(req.files)
	if(originalFilename)
		fs.readFile(filePath,function(err,data){
			var timestamp=Date.now()
			var type=posterData.type.split('/')[1]
			var poster=timestamp+ '.' + type
			var newPath=path.join(__dirname, '../../', '/public/upload/'+poster)
			fs.writeFile(newPath, data, function(err){
				req.poster= poster
				next()
			})
		})
	else
		//没有图片上传则进入下一步
		next()
		//save()
}