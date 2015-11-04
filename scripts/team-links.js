var casper = require('casper').create();

function getTeamLinks() {
  var links = document.querySelectorAll('.css-panes a');
  var out = [];
  for (var j=0; j<links.length; j++) {
    out[j] = links[j].href;
  }
  return out;
}

function getTeamStats() {
  var stats = document.createElement('div'),
      category = [];
  
  stats.innerHTML = document.querySelector('.contentArea table').innerHTML;
  category = stats.querySelectorAll('table');

  var out = [];
  for (var j=0; j<category.length; j++) {
    out[j] = document.createElement('div');
    out[j].innerHTML = category[j].innerHTML;
  }
  return out;
}

function parseStatistic(table) {
  //var rows = table.querySelectorAll('tr');
  return table.innerHTML;
  
  var out = [];
  for (var j=0; j<rows.length; j++) {
    out[j] = rows[j].innerHTML;
  }
  return out;
}

var team_links;

casper.start('http://stats.ncaa.org/team/inst_team_list/12240?division=11.0', function() {
  team_links = this.evaluate(getTeamLinks);
});

casper.then(function() {
  var stats;
  for (var j=0; j<team_links.length; j++) {
    this.echo(team_links[j]);
    this.thenOpen(team_links[j], function() {
      stats = this.evaluate(getTeamStats);
      for (var k=0; k<stats.length; k++) {
        var data = this.evaluate(parseStatistic, stats[k]);
        this.echo("RZA");
        this.echo(data);
      }
    });
  }
});

casper.run(function() {
  //this.echo(links.length + ' links found.');
  //this.echo(' - ' + links.join('\n')).exit();
  this.exit();
});
