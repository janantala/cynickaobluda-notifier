var jsdom = require("jsdom");
var querystring = require('querystring');
var http = require('http');

var lastPost = {
	'title': ''
};

var post_data;
var post_options;
var post_req;

var sendMail = function(obj) {
	console.log('send mail');
	post_data = querystring.stringify({
		'title' : obj.title,
		'img': obj.img
	});

	post_options = {
		host: 'www.example.com',
		port: '80',
		path: '/cynickaobluda/mail.php',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		}
	};

	post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	post_req.write(post_data);
	post_req.end();
};

setInterval(function(){
	jsdom.env(
		"http://www.cynickaobluda.com/",
		["http://code.jquery.com/jquery.js"],
		function (errors, window) {
			var $ = window.$;

			var headers = window.$(".post h3 a");
			var images = window.$(".separator img");

			if (lastPost.title.length === 0) {
				lastPost.title = $(headers[0]).text();
			}

			var isPost = false;
			console.log(lastPost.title);

			for (var j=window.$(".post").length-1; j>=0; j--) {
				if (lastPost.title && lastPost.title.indexOf($(headers[i]).text()) > -1) {
					isPost = true;
					break;
				}
			}

			for (var i=window.$(".post").length-1; i>=0; i--) {
				var obj = {
					'title': $(headers[i]).text().toString('utf-8').trim(),
					'img': images[i].src.toString('utf-8').trim()
				};

				if (lastPost.title && (lastPost.title.indexOf($(headers[i]).text()) > -1)) {
					isPost = false;
					continue;
					
				}
				else if (!isPost) {
					lastPost = obj;
					sendMail(obj);
				}

				if (i===0) {
					lastPost = obj;
				}
			}

			console.log(lastPost.title);
		}
	);
}, 600000);

var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
	res.writeHead(200);
	res.end(lastPost.title + "\n");
}).listen(port);