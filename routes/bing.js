const express = require('express');
const bing = require('node-bing-api')({ accKey: "2e4ead038dae45889f7f713afd5fc008" });

function htmlNewsBuilder(data, html) {
    for (let i = 0; i < 10; i++) {
        html += '<h3>' + data.value[i].name + '</h3>' +
            '<p>Link to article: <a href=' + data.value[i].url + '>' + data.value[i].url + '</a></p>'
    }
    return html;
}


function getTrendNews(top10Trends, res, count, max, html) {
    html += '<h2>' + (count+1) + '. ' + top10Trends[count] + '</h2>';
    bing.news(top10Trends[count], { count: 10 }, function (error, resp, data) {
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
    console.log(top10Trends);
    //return res.json(data);
    let html = '<!DOCTYPE html>' +
        '<html><head><title>Trending pics in ' + query + '</title></head>' +
        '<body>' + '<h1>Trending pics in ' + query + '</h1>';
    getTrendNews(top10Trends, res, 0, 0, html);
}




function getPics(top10Trends, query, res) {

}

module.exports = { getNews, getPics };