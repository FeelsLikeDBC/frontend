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

  translation = Hash["jan", "January",
                     "feb", "February",
                     "mar", "March",
                     "apr", "April",
                     "may", "May",
                     "jun", "June",
                     "jul", "July",
                     "aug", "August",
                     "sep", "September",
                     "oct", "October",
                     "nov", "November",
                     "dec", "December"]

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  puts "params[:month]"
  @month = translation[params[:month]]

  @kc_month_temp = kc_hash[params[:month]]
  array = []

  sf_hash.each do |key, value|
    array << (value - @kc_month_temp).abs
  end

  puts "The array:"
  p array

  puts "The result of array.each_with_index.min[0]:"
  smallest_number = array.each_with_index.min[0]
  p array_of_indexes = array.each_index.select{|i| array[i] == smallest_number}

  #This below could be done with a hash?
  @array_of_closest_matching_temps = []

  array_of_indexes.each do |index|
    @array_of_closest_matching_temps << sf_hash.values[index]
  end

  puts "@array_of_closest_matching_temps"
  p @array_of_closest_matching_temps

  @array_of_closest_matching_months = []

  array_of_indexes.each do |index|
    @array_of_closest_matching_months << months[index]
  end

  puts "@array_of_closest_matching_months"
  p @array_of_closest_matching_months

  biggest_sf_number = sf_hash.values.each.max
  smallest_sf_number = sf_hash.values.each.min

  if @kc_month_temp > biggest_sf_number
    @message = "Kansas City is hotter than the hottest day in San Francisco!!!"
  elsif @kc_month_temp < smallest_sf_number
    @message = "Kansas City is colder than the coldest day in San Francisco!!!"
  end


  erb :compare

end

