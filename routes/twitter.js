const express = require('express');
const twit = require('twit');
const bingnewsRouter = require('./bing');
const router = express.Router();

const apiKey = 'JiZw0LDxyItpT9RowC0LjUUxU';
const apiSecretKey = 'QOFXRDziLsysKNW6CZsP5huiVrUTO6WQKyji87chDkDy7A7VUJ';
const accessToken = '1295958893827223557-97diUVsv3TgLcW304pR5CEBEkE1Cdq';
const accessTokenSecret = 'RiSn6jXAi0WA9NHJCxmYM8bNnFYdQJLTPgGqnCFlERfnp';

const T = new twit({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret
})

function getTop10Trends(data, req, res) {
    const top10Trends = []
    for(let i = 0; i < 10; i++) {
        top10Trends.push(data[0].trends[i].name)
    }
    if (req.params.function == 'pics') {
        flickrRouter.getPics(top10Trends, req.params.query, res);
    } else {
        bingnewsRouter.getNews(top10Trends, req.params.query, res);
    }
}

/**
 * Returns the top 50 trending topics for a specific WOEID, if trending 
 * information is available for it.
 * @param {*} data An array of "locations" that encode the location's WOEID
 *  and some other human-readable information such as a canonical name and 
 * country the location belongs in.
 * @param {*} res The resporse variable of the router.get entry point.
 */
function getTrendingData(data, req, res) {
    let woeid = data[0].woeid;
    let params = {
        id: woeid,
        exclude: 'hashtags'
    }
    T.get('trends/place', params)
        .catch(function (err) {
            console.log('caught error', err.stack)
        })
        .then(function (result) {          
            getTop10Trends(result.data, req, res);
        })
}

/**
 * Returns the locations that Twitter has trending topic information for, 
 * closest to a specified location.
 * @param {*} data A list of valid places that can be used.
 * @param {*} res The resporse variable of the router.get entry point.
 */
function getClosestData(data, req, res) {
    let locLat = data.result.places[0].centroid[1];
    let locLong = data.result.places[0].centroid[0];
    let params = {
        lat: locLat,
        long: locLong
    }
    T.get('trends/closest', params)
        .catch(function (err) {
            console.log('caught error', err.stack)
        })
        .then(function (result) {
            getTrendingData(result.data, req, res);
        })
}

/**
 * Search for places that can be attached to a Tweet via POST statuses/updates 
 * given a latitude and a longitude pair, an IP address, or a name.
 * @param {*} req The request variable of the router.get entry point
 * @param {*} res The resporse variable of the router.get entry point.
 */
function getLocationData(req, res) {
    let params = {
        query: req.params.query
    }
    T.get('geo/search', params)
        .catch(function (err) {
            console.log('caught error', err.stack)
        })
        .then(function (result) {
            getClosestData(result.data, req, res);
        })
}

router.get('/:function/:query', (req, res) => {
    if (req.params.function == 'pics' || req.params.function == 'news') {
        getLocationData(req, res);
    } else {
        res.sendStatus(404); // HTTP status 404: NotFound
    }
});

module.exports = router;