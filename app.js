const express = require('express');
const twitterRouter = require('./routes/twitter');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    const str =  '<!DOCTYPE html>' +
    '<html>' +
        '<head>' + 
            '<style>' + 
                'body { background-color: #847d95; }' +
                'h1 { text-align: center; padding: 200px 0 0; font-family: verdana; font-weight: 100; font-size: 80px; color: #920e11; }' +
                'h2 { font-family: helvetica; color: #920e11; }' +
                'p { font-family: helvetica; }' +
            '</style>' +         
            '<title>Twitteliser</title>' + 
        '</head>' +
        '<body>' + 
            '<h1>Twitteliser</h1>';;

    res.writeHead(200,{'content-type': 'text/html'});
    res.write(str);
    res.end();
});

app.use('/trending?', twitterRouter);

app.listen(port, function () {
    console.log(`Express app listening at http://${hostname}:${port}/`);
});
