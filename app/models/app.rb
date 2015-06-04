require 'sinatra/handlebars'

class App < Sinatra::Base
  register Sinatra::Handlebars
  handlebars {
    templates '/js/templates.js', ['app/templates/*']
  }
end
