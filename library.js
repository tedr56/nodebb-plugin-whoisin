(function(module) {
"use strict";

//var USER = require('../../src/user');

var whoisin = {},
		mainTemplate =
		// TODO: get from'/templates/views/main';
		'<div class="whoisin row">' +
		'  <h4>Who is in?</h4>' +
		'  <button class="iamin btn btn-primary">I am in!</button>' +
		'</div>';

whoisin.init = function(app, middleware, controllers, callback) {
	console.log('nodebb-plugin-whoisin: loaded');

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.
	app.get('/admin/plugins/whoisin', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/whoisin', renderAdmin);

	callback();
};

whoisin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/whoisin',
		icon: 'fa-child',
		name: 'whoisin'
	});

	callback(null, header);
};

whoisin.parse = function(postContent, callback) {
		postContent = postContent.replace(/Who is in\?/gi, mainTemplate);
		/*
		app.render('lib/main', {title: 'who is in test'}, function(err, html) {
			if (err) {
				console.log('ERROR rendering template: ', err);
			}
			console.log('rendering the whoisin template: ', html);
		});
		callback(null, postContent);*/
};

function renderAdmin(req, res, next) {
	res.render('admin/plugins/whoisin', {});
}

module.exports = whoisin;

}(module));
