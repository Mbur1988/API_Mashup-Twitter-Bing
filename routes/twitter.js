const express = require('express');

const flickrRouter = require('./flickr');
const bingnewsRouter = require('./bingnews');

const router = express.Router();

router.get('/', (req, res) => {
    const str =  '<!DOCTYPE html>' +
    '<html><head><title>Twitter Demo</title></head>' +
    '<body>' +
    '<h1>' + 'The Twitter API Demo' + '</h1>' +
    '</body></html>';

    res.writeHead(200,{'content-type': 'text/html'});
    res.write(str);
    res.end();
});

router.get('/:query/:number', (req, res) => {
    res.write('Twitter API - ' + req.params.query + ":" + req.params.number);
    res.end();
});

router.use('/pics?',flickrRouter);
router.use('/news?',bingnewsRouter); 

module.exports = router;