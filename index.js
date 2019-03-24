var express = require('express'); // eslint-disable-line node/no-missing-require
var app = express();
var expressBrowserify = require('express-browserify'); // eslint-disable-line node/no-missing-require
var dotenv = require('dotenv');
var watson = require('watson-developer-cloud');

var isDev = app.get('env') === 'development';
app.get(
  '/bundle.js',
  expressBrowserify('public/client.js', {
    watch: isDev,
    debug: isDev
  })
);

app.use(express.static('public/'));

// optional: load environment properties from a .env file
dotenv.load({ silent: true });

// For local development, specify the username and password or set env properties
var ltAuthService = new watson.AuthorizationV1({
    // iam_apikey: "H4yxEtBkhcF3WBqM513b3G3WGone1U5-lkBc3IHr0GiJ",
    // url: watson.ToneAnalyzerV3.URL
    iam_apikey: 'vyUTy6FTVh2ghd3XGmfwpwD1Qf5BkW6cS67vIma28jL',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/ap'
});

app.get('/api/token/tone_analyzer', function(req, res) {
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
  console.log('Watson browserify example server running at http://localhost:%s/', port);
});
