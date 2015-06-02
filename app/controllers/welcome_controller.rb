get '/' do
  erb :index
end

get '/things' do
  if request.xhr?
    resp = Unirest.get "https://api.forecast.io/forecast/81c88efeafdeb098caa777f0281510a8/37.8267,-122.423"
    resp.body.to_json
  else
    status 404
  end
end

get '/compare' do
  @month = "jan"
  erb :compare
end

get '/month' do
  kc_hash = Hash["jan", 36, "feb", 43, "mar", 54, "apr", 65, "may", 75, "jun", 84, "jul", 89, "aug", 87, "sep", 79, "oct", 68, "nov", 52, "dec", 40]
  sf_hash = Hash["jan", 35, "feb", 37, "mar", 62, "apr", 63, "may", 35, "jun", 66, "jul", 67, "aug", 20, "sep", 70, "oct", 69, "nov", 63, "dec", 57]
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  puts "params[:month]"
  @month = params[:month]

  kc_month_temp = kc_hash[params[:month]]
  array = []

  sf_hash.each do |key, value|
    array << (value - kc_month_temp).abs
  end

  puts "The array:"
  p array

  puts "The result of array.each_with_index.min[0]:"
  smallest_number = array.each_with_index.min[0]
  p array_of_indexes = array.each_index.select{|i| array[i] == smallest_number}

  @array_of_closest_matching_months = []

  array_of_indexes.each do |index|
    @array_of_closest_matching_months << months[index]
  end

   p @array_of_closest_matching_months

  erb :compare

end

