const express = require('express');
const twitterRouter = require('./routes/twitter');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    const str =  '<!DOCTYPE html>' +
    '<html><head><title>Trending app</title></head>' +
    '<body>' +
    '<h1>' + 'Trending app' + '</h1>' +
    'Usage: http://localhost:3000/trending/function/query <br>' +
    '<ul>' + '<li>function - either pics or news </li>'
    + '<li>query - corresponds to the location to search for trending topics</li>'
    + '<li>Example: <a href="http://localhost:3000/trending/pics/Brisbane">http://localhost:3000/trending/pics/Brisbane</a></li>' +
    '</ul>' +
    '</body></html>';

    res.writeHead(200,{'content-type': 'text/html'});
    res.write(str);
    res.end();
});

app.use('/trending?', twitterRouter);

app.listen(port, function () {
    console.log(`Express app listening at http://${hostname}:${port}/`);
});
