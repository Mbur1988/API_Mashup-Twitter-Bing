const express = require('express');
const Twit = require('twit');

const flickrRouter = require('./flickr');
const bingnewsRouter = require('./bingnews');

const router = express.Router();

const apiKey = 'JiZw0LDxyItpT9RowC0LjUUxU';
const apiSecretKey = 'QOFXRDziLsysKNW6CZsP5huiVrUTO6WQKyji87chDkDy7A7VUJ';
const accessToken = '1295958893827223557-97diUVsv3TgLcW304pR5CEBEkE1Cdq';
const accessTokenSecret = 'RiSn6jXAi0WA9NHJCxmYM8bNnFYdQJLTPgGqnCFlERfnp';

const T = new Twit({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret
})

router.get('/', (req, res) => {
    const str = '<!DOCTYPE html>' +
        '<html><head><title>Twitter Demo</title></head>' +
        '<body>' +
        '<h1>' + 'The Twitter API Demo' + '</h1>' +
        '</body></html>';

    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(str);
    res.end();
});

router.get('/:query/:number', (req, res) => {
    let searchParams = {
        query: req.params.query
    }
    T.get('geo/search', searchParams, (err, searchData, response) => {
        let locLat = searchData.result.places[0].centroid[1];
        let locLong = searchData.result.places[0].centroid[0];
        let closestParams = {
            lat:    locLat,
            long:   locLong
        }
        T.get('trends/closest', closestParams, (err, closestData, response) => {
            let woeid = closestData[0].woeid;
            let trendsParams = {
                id: woeid
            }
            T.get('trends/place', trendsParams, (err, trendsData, response) => {
                return res.json(trendsData);
            });
        });
    });
});

router.use('/pics?', flickrRouter);
router.use('/news?', bingnewsRouter);

module.exports = router;