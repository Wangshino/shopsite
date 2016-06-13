var Index = require('../app/controller/index')
var User = require('../app/controller/user')
var Shop = require('../app/controller/shop')
var Comment = require('../app/controller/comment')
var Cart = require('../app/controller/cart')
var Category = require('../app/controller/category')

module.exports = function(app) {
	app.use(function(req, res, next) {
		var _user = req.session.user
		app.locals.user = _user
		next()
	})


	//index
	app.get('/', Index.index)

	//User
	//signup
	app.post('/user/signup', User.signup)

	//userlist
	app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list)
	//user signin
	app.post('/user/signin', User.signin)
	//user logout
	app.get('/logout', User.logout, User.signinRequired)
	app.get('/signin', User.showSignin)
	app.get('/signup', User.showSignup)

	// Shop
	// detail
	app.get('/shop/:id', Shop.detail)
	//admin
	app.get('/admin/shop', User.signinRequired, User.adminRequired, Shop.new)
	//admin post
	app.post('/admin/shop/new', User.signinRequired, User.adminRequired, Shop.savePoster, Shop.save)
	//sh
	app.get('/admin/list', User.signinRequired, User.adminRequired, Shop.list)
	//list delete
	app.delete('/admin/list', User.signinRequired, User.adminRequired, Shop.del)
	//update
	app.get('/admin/update/:id', User.signinRequired, User.adminRequired, Shop.update)
	//
	app.delete('/admin/userlist', User.signinRequired, User.adminRequired, Shop.deluser)

	//Comment
	app.post('/user/comment', User.signinRequired, Comment.save)

	// //Category
	//insert category
	app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
	app.post('/admin/category', User.signinRequired, User.adminRequired,Category.save)
	app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

	// //delete category
	app.delete('/admin/category/list', User.signinRequired, User.adminRequired, Category.del)

	// //result
	app.get('/results', Index.search)
	//cart
	app.get('/cart', User.signinRequired, Cart.showCart)

	app.get('/delFromCart/:id', User.signinRequired, Cart.DelCart)

	app.post('/cart/clearing', Cart.Clear)

	app.get('/addToCart/:id', User.signinRequired, Cart.AddToCart)
}