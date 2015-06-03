$(function(){
  cities.setEventListeners();

  $(".month_form").on('submit', function(event){
    event.preventDefault();

    var selected_month = $(".month_form option:selected").val();

    var city_object = function(fromto){
            var retrievedObject = localStorage.getItem(fromto);
            return JSON.parse(retrievedObject);
        };

    var avg_temps = function(city_object){

        var month_prop_totals = [0,0,0,0,0,0,0,0,0,0,0,0];
        var month_days_count = [0,0,0,0,0,0,0,0,0,0,0,0];
        var month_prop_avgs =  [0,0,0,0,0,0,0,0,0,0,0,0];


        var month_array = city_object.data;

        for(var i = 0; i < month_array.length; i++){
          month_prop_totals[month_array[i]["month"] - 1] += month_array[i]["high_temp"];
          month_days_count[month_array[i]["month"] - 1] += 1;
        };

        for(var i = 0; i < month_prop_totals.length; i++){
          var month = month_prop_totals[i];
          var average = (Math.round(month/month_days_count[i]));
          month_prop_avgs[i] = average;
        };
        return month_prop_avgs;
      };


        var from_name = city_object("from").city.name.replace("_"," ");
        var to_name = city_object("to").city.name.replace("_"," ");

        var from_city_avgs = avg_temps(city_object("from"));
        var to_city_avgs = avg_temps(city_object("to"));
        // console.log("from_city_avgs:", from_city_avgs);
        // console.log("to_city_avgs:", to_city_avgs);


        var comparison = function(from_city_name, from_city_avgs,
                                  to_city_name, to_city_avgs){

          console.log("from_city_name:", from_city_name);
          console.log("from_city_avgs:", from_city_avgs)

          console.log("to_city_name:", to_city_name);
          console.log("to_city_avgs:", to_city_avgs)

          console.log("selected_month:", selected_month);

          var months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

          var entry_index = months.indexOf(selected_month);

          console.log("entry_index:", entry_index)

          var to_city_temp = to_city_avgs[entry_index]

          console.log("to_city_temp:", to_city_temp)

          var differences_array = []

          for(var i = 0; i < from_city_avgs.length; i++){
            differences_array.push(Math.abs(from_city_avgs[i] - to_city_temp))
          };

          console.log("differences_array:", differences_array)

          smallest_number = Math.min.apply(Math, differences_array)
          console.log("smallest_number:", smallest_number)

          var array_of_indexes = []
          for(var i = 0; i < differences_array.length; i++){
            if(differences_array[i] === smallest_number){
              array_of_indexes.push(i)
            }
          };

          console.log("array_of_indexes:", array_of_indexes)

          var array_of_closest_matching_temps = []
          for(var i = 0; i < array_of_indexes.length; i++){
            array_of_closest_matching_temps.push(from_city_avgs[array_of_indexes[i]])
          }

          console.log("array_of_closest_matching_temps:", array_of_closest_matching_temps)

          var array_of_closest_matching_months = []

          for(var i = 0; i < array_of_indexes.length; i++){
            array_of_closest_matching_months.push(months[array_of_indexes[i]])
          };

          console.log("array_of_closest_matching_months:", array_of_closest_matching_months)

          var string_of_closest_matching_months = array_of_closest_matching_months.join(', ')

          console.log("string_of_closest_matching_months:", string_of_closest_matching_months)

          var biggest_from_city_number = Math.max.apply(Math, from_city_avgs)
          var smallest_from_city_number = Math.min.apply(Math, from_city_avgs)

          console.log("biggest_from_city_number:", biggest_from_city_number)
          console.log("smallest_from_city_number:", smallest_from_city_number)

          if(to_city_temp > biggest_from_city_number){
            var difference = to_city_temp - biggest_from_city_number
            var message = selected_month + " in " + to_city_name + " is " + difference + "° hotter than the hottest month in " + from_city_name + "!!!"
          } else if (to_city_temp < smallest_from_city_number){
            var difference = smallest_from_city_number - to_city_temp
            var message = selected_month + " in " + to_city_name + " is " + difference + "° colder than the coldest month in " + from_city_name + "!!!"
          } else {
            var message = selected_month + " in " + to_city_name + " is like " + string_of_closest_matching_months + " in " + from_city_name + "."
          }

          console.log("message:", message)


          // if @city_1_month_temp > biggest_city2_number
          //   difference = (@city_1_month_temp - biggest_city2_number).to_s
          //   @message = "#{@month} in #{first_city_name} is #{difference}° hotter than the hottest month in #{second_city_name}!!!"
          // elsif @city_1_month_temp < smallest_city2_number
          //   difference = (smallest_city2_number - @city_1_month_temp).to_s
          //   @message = "#{@month} in #{first_city_name} is #{difference}° colder than the coldest month in #{second_city_name}!!!"
          // else
          //   @message = "#{@month} in #{first_city_name} is like #{@string_of_closest_match_months} in #{second_city_name}."
          // end

















        };

        comparison(from_name, from_city_avgs, to_name, to_city_avgs)


    });


  });








