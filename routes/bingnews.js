//const express = require('express');

function getNews(data, res) {
    return res.json(data);
}

module.exports.getNews = getNews;