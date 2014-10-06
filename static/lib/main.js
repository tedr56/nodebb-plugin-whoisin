(function() {
	"use strict";

	window.WhoisinPlugin = {
		load: function(data) {
			$('div.whoisin button.iamin').on('click', function(e) {
				alert('will add you');

			});
		}
	}

	console.log('nodebb-plugin-whoisin: is loaded');
}());
