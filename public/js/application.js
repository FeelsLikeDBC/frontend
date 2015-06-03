$(function(){
  cities.setEventListeners();

  $(".month_form").on('submit', function(event){
    event.preventDefault()

    var selected_month = $(".month_form option:selected").val()

    var resp_1 = $.get(
      "https://dbc-feels-like.herokuapp.com/city/1/weather").done(function(reply){

        var month_prop_totals = [0,0,0,0,0,0,0,0,0,0,0,0]
        var month_days_count = [0,0,0,0,0,0,0,0,0,0,0,0]

        var month_array = reply.data

        for(var i = 0; i < month_array.length; i++){
          month_prop_totals[month_array[i]["month"] - 1] += month_array[i]["high_temp"]
          month_days_count[month_array[i]["month"] - 1] += 1

        };

        console.log(month_prop_totals)
        console.log(month_days_count)

        var month_prop_avgs = [];

        for(var i = 0; i < month_prop_totals.length; i++){
          var month = month_prop_totals[i]
          month_prop_avgs.push(Math.round(month/month_days_count[i]))
        };

        console.log(month_prop_avgs)

      });

  });

















})
