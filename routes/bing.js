const express = require('express');
const bing = require('node-bing-api')({ accKey: "2e4ead038dae45889f7f713afd5fc008" });


const NUM_TRENDS_TO_DISPLAY = 5;
const NUM_NEWS_PER_TREND = 10;
const NUM_PICS_PER_TREND = 20;


function htmlNewsBuilder(data, html) {
    for (let i = 0; i < data.value.length; i++) {
        html += '<p>' + data.value[i].name + ' - Link to article:<br /><a href=' + 
        data.value[i].url + '>' + data.value[i].url + '</a></p>'
    }
    return html;
}

function getTrendNews(top10Trends, res, count, max, html) {
    html += '<h2>' + (count+1) + '. #' + top10Trends[count] + '</h2>';
    const params = { count: NUM_NEWS_PER_TREND }
    bing.news(top10Trends[count], params, function (error, resp, data) {
        html = htmlNewsBuilder(data, html);
        if (count == max) {
            html += '</body></html>';
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(html);
            res.end();
        } else {
            getTrendNews(top10Trends, res, ++count, max, html);
        } 
    });
}

function getNews(top10Trends, query, res) {
    let html = '<!DOCTYPE html>' +
        '<html>' +
            '<head>' + 
                '<style>' + 
                    'body { background-color: #847d95; }' +
                    'h1 { font-family: verdana; font-weight: 100; font-size: 40px; color: #920e11; }' +
                    'h2 { font-family: helvetica; color: #920e11; }' +
                    'p { font-family: helvetica; }' +
                '</style>' +         
                '<title>TwitNews</title>' + 
            '</head>' +
            '<body>' + 
                '<h1>TwitNews for "' + query + '"</h1>';
    getTrendNews(top10Trends, res, 0, NUM_TRENDS_TO_DISPLAY-1, html);
}

function htmlPicsBuilder(data, html) {
    for (let i = 0; i < data.value.length; i++) {
        html += '<img src=' + data.value[i].contentUrl + ' alt=' + data.value[i].name + ' height="200" /> ';
    }
    return html;
}

function getTrendPics(top10Trends, res, count, max, html) {
    html += '<h2>' + (count+1) + '. #' + top10Trends[count] + '</h2>';
    const params = { count: NUM_PICS_PER_TREND }
    bing.images(top10Trends[count], params, function (error, resp, data) {
        html = htmlPicsBuilder(data, html);
        if (count == max) {
            html += '</body></html>';
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(html);
            res.end();
        } else {
            getTrendPics(top10Trends, res, ++count, max, html);
        } 
    });
}

function getPics(top10Trends, query, res) {
    let html = '<!DOCTYPE html>' +
        '<html>' +
            '<head>' + 
                '<style>' + 
                    'body { background-color: #847d95; }' +
                    'h1 { font-family: verdana; font-weight: 100; font-size: 40px; color: #920e11; }' +
                    'h2 { font-family: helvetica; color: #920e11; }' +
                    'p { font-family: helvetica; }' +
                '</style>' +         
                '<title>TwitPics</title>' + 
            '</head>' +
            '<body>' + 
                '<h1>TwitPics for "' + query + '"</h1>';
    getTrendPics(top10Trends, res, 0, NUM_TRENDS_TO_DISPLAY-1, html);
}

module.exports = { getNews, getPics };