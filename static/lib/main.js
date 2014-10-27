(function() {
	"use strict";

	window.WhoisinPlugin = {
		load: function(data) {
			socket.emit('plugins.whoisin.load', {
				url: data.url
			}, function(err, users) {
				console.log('loading who is in plugin with ', users);
				for (var user in users) {
					$('div.whoisin').append('<div class="whoisin-user"> User: ' + user + '</div>')
				}
			});
		}
	}

	$(window).on('action:ajaxify.end', function(ev, data) {
		if (/^topic\/[\d]+/.test(data.url)) {
			// load existing users into whoisin widget
			WhoisinPlugin.load(data);

			// add currently logged in user when iamin button is tapped
			$('div.whoisin button.iamin').on('click', function(e) {
				socket.emit('plugins.whoisin.commit', {
					url: data.url
				}, function(err, result) {
					if (err) {
						// TODO: handle error
					} else {
						console.log('getting users result: ' + result);
						WhoisinPlugin.load(data);
					}
				});
			});
		}
	});


	console.log('nodebb-plugin-whoisin: is loaded');
}());
