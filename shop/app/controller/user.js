var User = require('../models/user')

//signup
//-------------------------------------form validate-----
exports.signup = function(req, res) {
	var _user = req.body.user
	User.findOne({
		name : _user.name
	}, function(err, user) {
		if(err)  console.log(err)

		if(user)
			return res.redirect('/signin')
		//--------------------------------------//
		else
			user = new User(_user)
			user.save(function(err, user) {
				if(err)  console.log(err)

				res.redirect('/')
			})
	})
}

exports.signin = function(req, res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({
		name : name
	}, function(err, user) {
		if(err)  console.log(err)

		if(!user)
			return res.redirect('/signup')
		user.comparePassword(password, function(err, isMatch) {
			if(err) console.log(err)

			if(isMatch) {
				//save user  on serve
				req.session.user = user
				return res.redirect('/')
			}
			else
				return res.redirect('../signin')
		})
	})
}

exports.logout = function(req, res) {
	delete req.session.user
	res.redirect('/')
}

exports.signinRequired = function(req, res, next) {
	var user = req. session.user
	if(!user)
		return res.redirect('/signin')
	next()
}
exports.adminRequired = function(req, res, next) {
	var user = req.session.user
	if(user.role <= 10)
		return res.redirect('/signin')
	next()
}

exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if(err)  console.log(err)
		res.render('userlist', {
			title: 'shopsite userlist',
			users : users
		})
	})
}
exports.showSignup = function(req, res) {
        res.render('signup', {
            title: '注册页面'
        })
    }
    //signin
exports.showSignin = function(req, res) {
        res.render('signin', {
            title: '登录页面'
        })
    }