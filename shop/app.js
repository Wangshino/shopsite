var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser =require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo') (session)
var morgan = require('morgan')
var multipart = require('connect-multiparty')
var underscore = require('underscore')
var dbUrl = 'mongodb://localhost/shopsite'

var port = 3000
var app = express()
mongoose.connect(dbUrl)
app.locals.moment = require('moment')
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({
	extended: true
}))



app.use(cookieParser())
app.use(session({
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 3600000
	},
	secret: 'shopsite',
	store : new mongoStore({
		url: dbUrl,
		collection : 'sessions'
	})
}))

app.use(multipart())

app.use(express.static(path.join(__dirname, 'public')))

if('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}
require('./config/routes') (app)
app.listen(port)

console.log("started on port " + port)

// pre handle user
// app.use(function(req, res, next) {
// 	var _user = req.session.user
// 	app.locals.user = _user
// 	next()
// })


// // app.get('/', function(req, res) {
// // 	Commodity.fetch(function(err, commodites) {
// // 		if(err)
// // 			console.log(err)

// // 		res.render('index', {
// // 			title : 'shop website',
// // 			commodity : commodites
// // 		})
// // 	})
// // })

// // app.get('/shop/:id', function(req, res) {
	// var id = req.params.id
	// Commodity.findById(id, function(err, commodity) {
	// 	res.render('detail', {
	// 		title : 'Details',
	// 		commodity : commodity
	// 	})
	// })
// // })
// app.get('/admin/shop', function(req, res) {
// 	res.render('admin', {
// 		title : 'admin',
// 		commodity : {}
// 	})
// })




// //admin update
// app.get('/admin/update/:id', function(req, res) {
// 	var id = req.params.id
// 	if (id)
// 		Commodity.findById(id, function(err, commodity) {
// 			if(err) console.log(err)
// 			res.render('admin', {
// 				title: 'admin update',
// 				commodity : commodity
// 			})
// 		})
// })

// //admin post
// app.post('/admin/shop/new', function(req, res) {
// 	var id= req.body.commodity._id
// 	var commodityObj= req.body.commodity
// 	var _commodity
// 	if(id !== 'undefined') {
// 		Commodity.findById(id, function(err, commodity) {
// 			if(err)
// 				console.log(err)

// 			_commodity = underscore.extend(commodity, commodityObj)
// 			_commodity.save(function(err, commodity) {
// 				if(err)
// 					console(err)

// 				res.redirect('/shop/'+ commodity._id)
// 			})
// 		})
// 	}else {
// 		_commodity= new Commodity({
// 			name : commodityObj.name,
// 			origin : commodityObj.origin,
// 			price : commodityObj.price,
// 			summary : commodityObj.summary,
// 			flash : commodityObj.flash,
// 			poster:commodityObj.poster,
// 			year : commodityObj.year
// 		})
// 		_commodity.save(function(err, commodity) {
// 			if(err)
// 				console.log(err)
// 			res.redirect('/shop/'+ commodity._id)
// 		})
// 	}
// })
// //User logout
// // app.get('/logout', function(req, res) {
// // 	delete req.session.user
// // 	res.redirect('/')
// // })

// //userlist
// // app.get('/admin/userlist', function(req, res) {
// // 	User.fetch(function(err, users) {
// // 		if(err)
// // 			console.log(err)
// // 		res.render('userlist', {
// // 			title: 'userlist',
// // 			user : users
// // 		})
// // 	})
// // })

// //list delete
// app.delete('/admin/list', function(req, res) {
// 	var id = req.query.id

// 	if(id) {
// 		Commodity.remove({_id : id}, function(err, commodity) {
// 			if(err)
// 				console.log(err)
// 			else
// 				res.json({success : 1})
// 		})
// 	}
// })
// app.get('/admin/list', function(req, res) {pp.use(bodyParser.urlencoded({
// 	extended: true
// }))
// 	Commodity.fetch(function(err, commodity) {
// 		if(err)
// 			console.log(err)
// 		res.render('list', {
// 			title: 'list',
// 			commodity : commodity
// 		})
// 	})
// })

// // //User signup
// // app.post('/user/signup', function(req, res) {
// // 	var _user = req.body.user
// // 	User.findOne({name: _user.name}, function(err, user) {
// // 		if (err)
// // 			console.log(err);
// // 		if (user)
// // 			return res.json(true)
// // 		else
// // 			user = new User(_user);
// // 			user.save(function(err, user) {
// // 				if (err)
// // 					console.log(err)
// // 				res.redirect('/'); //admin/userlist
// // 			})
// // 	})
// // })

// //User signin
// // app.post('/user/signin', function(req, res) {
// // 	var _user = req.body.user
// // 	var name = _user.name
// // 	var password = _user.password

// // 	User.findOne({name : name}, function(err, user) {
// // 		if(err)
// // 			console.log(err)
// // 		if(!user)
// // 			return res.redirect('/')
// // 		user.comparePassword(password, function(err, isMatch) {
// // 			if(err)
// // 				console.log(err)
// // 			if(isMatch) {
// // 				req.session.user = user
// // 				return res.redirect('/')
// // 			}
// // 			else
// // 				//ajax
// // 				console.log('shibai')
// // 		})
// // 	})
// // })
// //Cart
// app.get('/addToCart/:id', function(req, res) {

// })
app.get('/cart', function(req, res) {
	res.render('cart', {
		title : 'Cart'
	})
})
