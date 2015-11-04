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

var getPageTitle = function() {
  return page.evaluate(function () {
    return document.title;
  });
};

/*
 * Return an array of links on a page.
 * 
 * Return Value:
 *  [ { html: <link 1>,
 *      text: <link 1>,
 *      href: <link 1> },
 *    { html: <link 2>,
 *      text: <link 2>,
 *      href: <link 2> },
 *    ...
 *    { html: <link n>,
 *      text: <link n>,
 *      href: <link n> }
 *  ]
 */
var getPageLinks = function() {
  return page.evaluate(function() {
    var out = [];
    for (var j=0; j<document.links.length; j++) {
      out[j] = {
        html: document.links[j].outerHTML,
        text: document.links[j].innerHTML,
        href: document.links[j].href,
      };
    }
    return out;
  });
};

page.open(url, function(status) {
  page.onLoadFinished = function() {
    page.render('out.png');
    var links = getPageLinks();
    for (var j=0; j<links.length; j++) {
      var link = links[j];
      if (/team.index/.test(link.href)) {
        var org_id = link.href.match(/org_id=(.*)$/)[1];
        console.log([org_id, link.text, link.href].join(','));
      }
    }
    phantom.exit();
  };
  page.evaluate(function() {
    var form = document.forms.params_form;
    form.sport_code.value = 'MFB';
    form.academic_year.value = 2016;
    form.division.value = 11;
    form.conf_id.value = -1;
    form.submit();
  });
});
