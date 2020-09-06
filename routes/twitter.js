const express = require('express');
const router = express.Router();
const twit = require('twit');

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

router.get('/', function(req, res, next) {
  next(createError(404));
  res.send('respond with a resource');
});

router.get('/:query', (req, res) => { 
  let params = { query: req.params.query }
  T.get('geo/search', params)

  .then(result => {
    let params = { 
      lat: result.data.result.places[0].centroid[1], 
      long: result.data.result.places[0].centroid[0] }
      return T.get('trends/closest', params)

  }) .then (result => {
    let params = {
        id: result.data[0].woeid,
        exclude: 'hashtags' }
    return T.get('trends/place', params)

  }) .then (result => {
    const top10Trends = []
    for(let i = 0; i < 10; i++) {
      top10Trends.push(result.data[0].trends[i].name)
    }
    return top10Trends;

  }) .then (result => {
    res.render("trending", { trending: result, location: req.params.query});
    
  }) .catch(function (err) {
    console.log('caught error', err.stack)
  })
});

module.exports = router;
