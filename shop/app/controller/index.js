var Commodity = require('../models/commodity')
var Category = require('../models/category')
var Config=require('../../config/routes')

exports.index = function(req, res) {
	Category
		.find({})
		.populate({ //每个分类下取出5条
			path: 'commodity',
			options: {
				limit: 5
			}
		})
		.exec(function(err, categories) {
			if (err)
				console.log(err)
			res.render('index', {
				title: '基于Node的小型电商平台',
				categories: categories
			})
	});
}
exports.search = function(req, res) {
	var catId = req.query.cat
	var page = Number(req.query.p)||0
	var q = req.query.q
	var count = 2
	var index = page * count
	if(catId)
		Category
			.find({_id : catId})
			.populate({ //每个分类下取出5条
				path: 'commodity',
				select: 'name poster'
			})
			.exec(function(err, categories) {
				if (err)
					console.log(err)
				var category = categories[0] || {}
				var commodities = category.commodity || []
				var results = commodities.slice(index, index + count)
				res.render('results', {
					title: 'result',
					keyword : category.name,
					currentPage : (page + 1),
					query : 'cat=' + catId,
					totalPage : Math.ceil(commodities.length/ count),
					commodity: results
				})
		});
	else
		Commodity
			.find({name :new RegExp(q+'.*','i')})
			.exec(function(err,commodities){
				if(err) console.log(err);

				var results=commodities.slice(index, index+count);

				res.render('results', {
					title: '结果列表页面',
					keyword : q,
					query:'q='+ q,
					currentPage: (page+1),
					totalPage: Math.ceil(commodities.length/count),
					commodity: results
				});
			})
}