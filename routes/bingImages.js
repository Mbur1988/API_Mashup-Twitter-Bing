var express = require('express');
var router = express.Router();
const bing = require('node-bing-api')({ accKey: "2e4ead038dae45889f7f713afd5fc008" });

const NUM_IMAGES_PER_TREND = 20;

router.get('/:trend', (req, res) => { 
    console.log(req.params.trend);
    let params = { count: NUM_IMAGES_PER_TREND }
    bing.images(req.params.trend, params, function (error, resp, data) {
        let stories = data.value;
        res.json({ stories });
    })
});

module.exports = router;