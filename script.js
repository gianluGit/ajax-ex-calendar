function initCalendario() {
  var currentMonth = moment('2018-01-01');
  var year = currentMonth.year();
  var month = currentMonth.month();

  printMonth(currentMonth);


  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      'year': year,
      'month': month
    },
    success: function(data, state) {
      var success = data['success'];
      var festivita = data['response'];

      console.log(festivita);

      if (success == true) {
        for (var i = 0; i < festivita.length; i++) {
          var targetFest = $('#target li[data-dataCompleta=' + festivita[i]['date'] + ']');
          console.log(targetFest);
          targetFest.addClass('festivita');
          targetFest.append(' ' + '- ' + festivita[i]['name']);
        }

      }
    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);

    }
  });



}
function printMonth(currentMonth) {
  var daysInMonth = currentMonth.daysInMonth();

  var template = $('#template-mese').html();
  var compiled = Handlebars.compile(template);
  var target = $('#target');
  target.html('');
  for (var i = 1; i <= daysInMonth; i++) {
    var dataCompleta = moment({
      year: currentMonth.year(),
      month: currentMonth.month(),
      day: i
    });

    var daysHTML = compiled({
      'value': i,
      'dataCompleta': dataCompleta.format('YYYY-MM-DD')
    });

    target.append(daysHTML);
  }
}









$(document).ready(function() {
  initCalendario();
});
