const express = require('express');

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

module.exports = router;