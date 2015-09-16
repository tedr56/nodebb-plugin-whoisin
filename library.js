(function(module) {
"use strict";

//var USER = require('../../src/user');

var whoisin = {},
		SocketPlugins = module.parent.require('./socket.io/plugins'),
		db = module.parent.require('./database'),
		// meta = module.parent.require('./meta'),
		user = module.parent.require('./user'),
		// posts = module.parent.require('./posts'),
		mainTemplate =
		// TODO: get from'/templates/views/main';
		'<div class="whoisin row">' +
		'  <h4>Who is in?</h4>' +
		'  <button class="iamin btn btn-primary">I am in!</button>' +
		'</div>';

whoisin.init = function(params, callback) {
	console.log('nodebb-plugin-whoisin: loaded');

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.
	params.router.get('/admin/plugins/whoisin', params.middleware.admin.buildHeader, renderAdmin);
	params.router.get('/api/admin/plugins/whoisin', renderAdmin);

	SocketPlugins.whoisin = {
		commit: whoisin.commit,
		load: whoisin.load
	};

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

whoisin.parse = function(data, callback) {
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }
		data.postData.content = data.postData.content.replace(/Who is in\?/gi, mainTemplate);
		callback(null, data);
};

whoisin.commit = function(socket, data, callback) {
	if (socket.hasOwnProperty('uid') && socket.uid > 0) {
		var topicid = data.url.match("topic/([0-9]*)")[1];
		db.getObject('post-' + topicid + '-whoisin_participants', function(err, whoisin_participants) {
			if (err) {
				console.log('whoisin plugin: noone is in');
			}
			whoisin_participants[socket.uid] = {
				isin: true,
				timestamp: new Date()
			};
			db.setObject('post-' + topicid + '-whoisin_participants', whoisin_participants , function(err){
				if (err) {
					console.log('Whoisin Plugin: Error saving to db, ', err);
				} else {
					console.log('saved to db: ', JSON.stringify(whoisin_participants));
					callback(null, "success");
				}
			});
		});
	} else {
		callback(new Error('not-logged-in'));
	}
}

whoisin.load = function(socket, data, callback) {
	var topicid = data.url.match("topic/([0-9]*)")[1];
	db.getObject('post-' + topicid + '-whoisin_participants', function(err, data) {
		if (err) {
			console.log('whoisin plugin: Error getting list of participants for topic');
		}
		console.log('got participant object: ', JSON.stringify(data));
		var users_array = [];
		for (var userid in data) {
			users_array.push(userid);
		}
		console.log('got user array :-> ', users_array);
		user.getMultipleUserFields(users_array, ['username', 'userslug', 'picture'], function(err, userData) {
			callback(null, userData);
		});
	});
}

function renderAdmin(req, res, next) {
	res.render('admin/plugins/whoisin', {});
}

module.exports = whoisin;

}(module));
