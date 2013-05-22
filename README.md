cynickaobluda-notifier
======================

Email notifications for a new meme at http://cynickaobluda.com


## Dependencies
You need following:
- heroku free hosting
- php hosting with smpt server and enabled cron


## User guides
- set up free heroku hosting
- change your php server route for POST requests in app.js file
- change your heroku app address in curl.php and set up cron on this file to prevent heroku free hosting from sleeping
- change your e-mail address in mail.php file
