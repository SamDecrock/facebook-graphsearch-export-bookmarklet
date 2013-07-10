// Anonymous "self-invoking" function
(function() {
	// Load jQuery:
	var script = document.createElement("SCRIPT");
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
	script.type = 'text/javascript';
	document.getElementsByTagName("head")[0].appendChild(script);

	// Poll for jQuery to come into existance
	var checkReady = function(callback) {
		if (window.jQuery) {
			callback(jQuery);
		}
		else {
			window.setTimeout(function() { checkReady(callback); }, 100);
		}
	};

	// jQuery is ready for use:
	checkReady(function($) {
		var people = [];

		// use some jQuery to find every person
		$("._4_yl").each(function (i, elem){
			people.push([
				$(elem).find('[data-bt="{"ct":"title"}"] a').text(), 													// name
				$(elem).find('[data-bt="{"ct":"sub_headers"}"] a').text(), 												// subtitle
				$(elem).find('[data-bt="{"ct":"title"}"] a').attr('href').replace('?ref=br_rs&fref=browse_search', ''), // url
				$(elem).find('[data-bt="{"ct":"image"}"] .img').attr('src') 											// image
			]);
		});

		// export to csv:
		var csv = 'name;subtitle;url;image\n';
		for(var i in people){
			csv += people[i].join(';') + '\n';
		}

		// present as download:
		window.location = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);

	});
})();