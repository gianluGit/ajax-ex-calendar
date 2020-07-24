function initCalendario() {
  var currentMonth = moment('2018-01-01');
  // var year = currentMonth.year();
  // var month = currentMonth.month();
  console.log(moment());

  printMonth(currentMonth);
  printHolidays(currentMonth);
  nextMonth(currentMonth);
  prevMonth(currentMonth);


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
      'value': dataCompleta.format('dddd') + ' - ' + i,
      'dataCompleta': dataCompleta.format('YYYY-MM-DD')
    });

    target.append(daysHTML);
  }
}

function printHolidays(currentMonth) {
  var year = currentMonth.year();
  var month = currentMonth.month();


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



function nextMonth(currentMonth) {
  var arrowNext = $('i.next');
  var arrowPrev = $('i.prev');
  arrowPrev.hide();



  arrowNext.click(function() {
    currentMonth.add(1, 'months');
    printMonth(currentMonth);
    printHolidays(currentMonth);


    arrowPrev.show();




    var nameMonth = $('h1.active');
    nameMonth.removeClass('active');
    nameMonth.next().addClass('active');


    var checkNextMonth = $('h1.last').hasClass('active');
    if (checkNextMonth == true) {
      arrowNext.hide();
    }


  });


}

function prevMonth(currentMonth) {
  var arrowPrev = $('i.prev');
  var arrowNext = $('i.next');


  arrowPrev.click(function() {
    currentMonth.add(-1, 'months');
    printMonth(currentMonth);
    printHolidays(currentMonth);

    arrowNext.show();

    var nameMonth = $('h1.active');
    nameMonth.removeClass('active');
    nameMonth.prev().addClass('active');


    var checkPrevMonth = $('h1.first').hasClass('active');
    if (checkPrevMonth == true) {
      arrowPrev.hide();
    }
  });

}










$(document).ready(function() {
  initCalendario();
});
