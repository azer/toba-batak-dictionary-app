var Centered = require("centered");
var PTSerif = require("pt-serif");
var PTMono = require("pt-mono");
var Brick = require("brick");
var debounce = require("debounce-fn");
var search = require("./search");

module.exports = Brick(Centered, PTSerif, PTMono, {
  show: show,
  ready: ready
});

function show (app) {
  if (!app.brick.browser) return;

  app.results || (app.results = []);

  var html = app.results.map(function (result) {
    return '<li class="result">' +
      '<span class="english">' +
      result.english +
      '</span> &#10230;<span class="batak">' +
      result.batak +
      '</span></li>';
  });

  app.brick.select('.results').html(html.join('\n'));
}

function ready (app) {
  app.brick.on('keyup', '.keyword', debounce(function () {
    var keyword =  app.brick.select('.keyword').val();

    console.log('searching', keyword);

    if (keyword.length > 2) {
      app.results = search(keyword);
    } else {
      app.results = [];
    }

    app.brick.refresh();
  }, 250));
}
