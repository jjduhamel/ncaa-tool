'use strict;'

var page = require('webpage').create(),
    system = require('system');

if (system.args.length === 1) {
  console.log("Usage: %s <team url>");
  phantom.exit();
}

var url = system.args[1];

page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  var links = page.evaluate(function() {
    return document.links;
  });
  console.log(title+': '+status);
  for (var j=0; j<links.length; j++) {
    console.log(links[j].href);
  }
  phantom.exit();
});
