var dict = require("toba-batak-dictionary");

module.exports = search;


function search (keyword) {
  var i = -1;
  var len = dict.length;
  var results = [];

  while (++i < len) {
    if (dict[i].english.indexOf(keyword) > -1) {
      results.push(dict[i]);
      continue;
    }

    if (dict[i].batak.indexOf(keyword) > -1) {
      results.push(dict[i]);
      continue;
    }
  }

  return results;
}
