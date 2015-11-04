#!/usr/bin/env ruby
#
# Collect NCAA Statistics
#
require 'csv'

def get_team_links
  out = []
  csv = CSV.parse(`phantomjs scripts/get-team-links.js`)
  keys = csv.shift
  csv.each do |values|
    out << Hash[keys.zip(values)]
  end
  out
end

def get_team_data(link)
  out = []
  csv = CSV.parse(`phantomjs scripts/get-team-data.js #{link}`)
  keys = csv.shift
  csv.each do |values|
    out << Hash[keys.zip(values)]
  end
  out
end

team_links = get_team_links
team_links.each do |link|
  p "%s: %s" % [ link.fetch('org_name'), link.fetch('org_link') ]
  p get_team_data(link.fetch('org_link'))
end
