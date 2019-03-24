var express = require('express');
var router = express.Router();
var id;
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneAnalyzer = new ToneAnalyzerV3({
    version_date: '2017-09-21',
    iam_apikey: 'vyUTy6FTVh2ghd3XGmfwpwD1Qf5BkW6cS67vIma28jLe',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
  });
// GET route for reading data
router.get('/', async function (req, res, next) {

  
  var text = req.query.name
    // var text = 'Team, I know that times are tough! Product '
    //   + 'sales have been disappointing for the past three '
    //   + 'quarter We have a competitive product, but we '
    //   + 'need to do a better job of selling it!'
    
    var toneParams = {
      tone_input: { 'text': text },
      content_type: 'application/json'
    };
    toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
        if (error) {
          console.log(error);
        } else {   
          newfoo = JSON.parse(JSON.stringify(toneAnalysis, null, 2));
          console.log("---->>>>"+JSON.stringify(toneAnalysis, null, 2));
          res.json(JSON.stringify(toneAnalysis, null, 2));
        }
      });
  
});


// GET route after entering data
router.post('/text', function (req, res, next) {
    var text = req.body.name
    
    var toneParams = {
      tone_input: { 'text': text },
      content_type: 'application/json'
    };
    toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
        if (error) {
          console.log(error);
        } else { 
          //console.log(JSON.stringify(toneAnalysis, null, 2));
        }
      });
  //return res.redirect("http://localhost:4200/analysis");
});


module.exports = router;