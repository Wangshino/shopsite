var Comment = require('../models/comment')
//comment save
exports.save = function(req, res) {
	var _comment = req.body.comment;
	var commodityId =_comment.commodity
	if (_comment.content === '') {
		console.warn('亲～评论内容不能为空！')
		return;
	}
	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment) {
			var reply={
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			}
			comment.reply.push(reply)
			comment.save(function(err,comment) {
				if(err)
					console.log(err)
			res.redirect('/shop/'+commodityId)
			})
		})
	}else{
		var comment = new Comment(_comment)
		comment.save(function(err,comment) {
			if(err){
				console.log(err)
			}
			res.redirect('/shop/'+commodityId)
		})
	}
}
