var casper = require('casper').create(),
    links = [];

function getLinks() {
  var links = document.querySelectorAll('.css-panes a');
  var out = [];
  for (var j=0; j<links.length; j++) {
    out[j] = links[j].href;
  }
  return out;
}

function getStats() {
  var stats = document.querySelectorAll(".mytable tbody");
  return stats;
}

casper.start('http://stats.ncaa.org/team/inst_team_list/12240?division=11.0', function() {
  this.echo(this.getTitle());
  links = this.evaluate(getLinks);
  for (var j=0; j<links.length; j++) {
    this.echo(links[j]);
  }
    //this.capture('webpage.png');
});

casper.then(function() {
  var j = 0;
  this.each(links, function() {
    j++;
    this.echo(links[j]);
    this.thenOpen(links[j], function() {
      this.echo(this.evaluate(getStats).length);
    });
  });
});

/*
casper.then(function() {
  links = links.concat(this.evaluate(getLinks));
});
*/

casper.run(function() {
  //this.echo(links.length + ' links found.');
  //this.echo(' - ' + links.join('\n')).exit();
  this.exit();
});
