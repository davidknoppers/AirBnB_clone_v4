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
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      for (let place of data) {
        $('section.places').append(
        $('<article></article>').append(
        $('<div class="price_by_night">').text('$' + place.price_by_night),
        $('<h2></h2>').text(place.name),
        $('<div class="informations"></div>').append(
          $('<div class="max_guest"></div>').text(place.max_guest + ' Guests'),
          $('<div class="number_rooms"></div>').text(place.number_rooms + ' Rooms'),
            $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms')),
            $('<div class="user"></div>').html('<b>Owner</b>: ' + 'Richard Sim'),
            $('<div class="description"></div>').html(place.description)));
      }
    }
  });
}
