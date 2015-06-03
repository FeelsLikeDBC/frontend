$(function(){
  cities.setEventListeners();

  $(".month_form").on('submit', function(event){
    event.preventDefault();

    var selected_month = $(".month_form option:selected").val();

    var city1_object = function(fromto){
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

        var from_city_avgs = avg_temps(city1_object("from"));
        var to_city_avgs = avg_temps(city1_object("to"));
        console.log("from_city_avgs:", from_city_avgs);
        console.log("to_city_avgs:", to_city_avgs);


    });


  });








