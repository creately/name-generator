const _ = require('lodash');
const nouns = require('./nouns');
const adjectives = require('./adjectives');


module.exports = generate;

generate.generate = generate;
function generate(options) {
  var defaults = {
    number: false,
    nouns,
    adjectives,
    words: 2,
    alliterative: false,
  };
  options = _.merge(defaults, options || {});

  var raw = getRawProjName(options);

  return {
    raw: raw,
    dashed: raw.join('-'),
    title: raw.map( w => capitalize( w )).join(' '),
    spaced: raw.join(' ')
  };
}

function capitalize( word ) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

function getRawProjName(options) {
  var raw = [];
  _.times(options.words - 1, function () {
    if (options.alliterative && raw.length)
      raw.push(_.sample(getAlliterativeMatches(options.adjectives, raw[0].substring(0, 1))));
    else
      raw.push(_.sample(options.adjectives).toLowerCase());
  });

  if (options.alliterative)
    raw.push(_.sample(getAlliterativeMatches(options.nouns, raw[0].substring(0, 1))));
  else
    raw.push(_.sample(options.nouns).toLowerCase());

  if (options.number) {
    raw.push(_.random(1, 9999));
  }
  return raw;
}

function getAlliterativeMatches(arr, letter) {
  var check = letter.toLowerCase();
  return _.filter(arr, function(elm) { return elm.substring(0, 1).toLowerCase() === check; });
}
