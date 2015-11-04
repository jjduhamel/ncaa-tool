'use strict;'

var page = require('webpage').create(),
    system = require('system');

var url = 'http://stats.ncaa.org/team';

page.onConsoleMessage = function(msg) {
  system.stderr.write('site: '+msg);
};

page.onError = function(msg, trace) {
  system.stderr.write(msg);
  //system.stderr.write(trace);
  system.stderr.write('\n');
}

var getPageTitle = function() {
  return page.evaluate(function () {
    return document.title;
  });
};

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
    var links = getPageLinks();
    console.log('org_id,org_name,org_link');
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
