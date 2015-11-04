'use strict;'

var page = require('webpage').create(),
    system = require('system');

if (system.args.length === 1) {
  console.log("Usage: %s <team url>");
  phantom.exit();
}

var url = system.args[1];

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

console.log('Scrape links on '+url);

page.open(url, function(status) {
  page.evaluate(function() {
    for (var j=0; j<document.links.length; j++) {
      var link = document.links[j];
      console.log([link.innerHTML, link.href].join(','));
    }
  });
  phantom.exit();
});
