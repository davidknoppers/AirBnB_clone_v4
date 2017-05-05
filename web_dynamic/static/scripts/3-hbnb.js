let amenitiesIDs = new Map();
$(document).ready(function () {
  $('input:checkbox').change(amenitiesCheckBox);
  statusColor();
  getPlaces();
});

function amenitiesCheckBox () {
  const amenID = $(this).attr('data-id');
  const amenName = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    amenitiesIDs.set(amenName, amenID);
  } else if ($(this).not(':checked')) {
    amenitiesIDs.delete(amenName);
  }
  let names = '';
  let listOfNames = amenitiesIDs.keys();
  for (let name of listOfNames) {
    if (names === '') {
      names = names.concat(name);
    } else {
      names = names.concat(', ', name);
    }
  }
  $('.amenities h4').text(names);
}

function statusColor () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
}
function getPlaces () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      $(data).each(function () {
        $('.places').append($('<article>').append('<div class="price_by_night">$' + $(this).attr('price_by_night') + '</div>')
    .append('<h2>' + $(this).attr('name') + '</h2>').append($('<div class="informations">')
    .append('<div class="max_guest">' + $(this).attr('max_guest') + ' Guests</div>')
    .append('<div class="number_rooms">' + $(this).attr('number_rooms') + ' Rooms</div>')
    .append('<div class="number_bathrooms">' + $(this).attr('number_bathrooms') + ' Bathrooms</div>'))
    .append('<div class="description">' + $(this).attr('description') + '</div>')
         );
      });
    }
  });
}
