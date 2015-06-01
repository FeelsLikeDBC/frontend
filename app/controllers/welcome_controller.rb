get '/' do
  erb :index
end

get '/sf' do
  if request.xhr?
    # resp = Unirest.get "https://api.forecast.io/forecast/81c88efeafdeb098caa777f0281510a8/37.8267,-122.423"
    resp = Unirest.get "https://dbc-feels-like.herokuapp.com/city/1/feels_like_yearly"
    # resp = Unirest.get "https://dbc-feels-like.herokuapp.com/city/1/feels_like"
    resp.body.to_json
  else
    status 404
  end
end


get '/chi' do
  if request.xhr?
    # resp = Unirest.get "https://api.forecast.io/forecast/81c88efeafdeb098caa777f0281510a8/37.8267,-122.423"
    resp = Unirest.get "https://dbc-feels-like.herokuapp.com/city/3/feels_like_yearly"
    # resp = Unirest.get "https://dbc-feels-like.herokuapp.com/city/1/feels_like"
    resp.body.to_json
  else
    status 404
  end
end
