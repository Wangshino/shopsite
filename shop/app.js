var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
// var bodyParser = require('bodyParser')
var port = 3000
var app = express()

// mongoose.connect('mongodb://localhost/test')

app.set('views', './views/pages')
app.set('view engine', 'jade')
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log("started on port " + port)
app.get('/', function(req, res){
	res.render('index', {
		title : 'shop website',
		goods : [{
			title : 'HAIWEI',
			_id : 1,
			poster : 'http://www.technobuffalo.com/wp-content/uploads/2016/02/25251765622_3f506fa53b_b.jpg'
			}, {
			title : 'HAIWEI2',
			_id : 2,
			poster : 'http://www.technobuffalo.com/wp-content/uploads/2016/02/25251765622_3f506fa53b_b.jpg'
			}]
	})
})
app.get('/shop/:id', function(req, res){
	res.render('detail', {
		title : 'Details',
		shop : {
			title : 'IphoneSE',
			orign : 'CN',
			year : '2016 - 3',
			summary : 'new Iphone tsisd dsjafoi sdfjosijfao  dfwe sdf sadf'
		}
	})
})
app.get('/admin/shop', function(req, res) {
	res.render('admin', {
		title : 'admin',
		shop : {
			title : '',
			orign : '',
			year : '',
			flash : '',
			poster : '',
			summary : ''
		}
	})
})
app.get('/admin/list', function(req, res) {
	res.render('List', {
		title : 'List',
		goods : {
			title : '1',
			_id : 1,
			orign : 'CN',
			year : '2016'
		}
	})
})
app.get('/cart', function(req, res) {
	res.render('cart', {
		title : 'Cart'
	})
})