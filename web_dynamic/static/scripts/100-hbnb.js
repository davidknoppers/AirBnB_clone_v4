let amenitiesIDs = {};
let statesIDs = {};
let citiesIDs = {};
$(document).ready(function () {
  $('.amenities input:checkbox').change(amenitiesCheckBox);
  $('input:checkbox.state_list').change(statesCheckBox);
  $('input:checkbox.city_list').change(citiesCheckBox);
  statusColor();
  $('button').click(searchButton);
  getPlaces();
});

function amenitiesCheckBox () {
  const amenID = $(this).attr('data-id');
  const amenName = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    amenitiesIDs[amenName] = amenID;
  } else if ($(this).not(':checked')) {
    delete amenitiesIDs[amenName];
  }
  let names = '';
  let listOfNames = Object.keys(amenitiesIDs);
  for (let name of listOfNames) {
    if (names === '') {
      names = names.concat(name);
    } else {
      names = names.concat(', ', name);
    }
  }
  $('.amenities h4').text(names);
}

function statesCheckBox () {
  const stateID = $(this).attr('data-id');
  const stateName = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    statesIDs[stateName] = stateID;
  } else if ($(this).not(':checked')) {
    delete statesIDs[stateName];
  }
  let names = '';
  let listOfNames = Object.keys(statesIDs).concat(Object.keys(citiesIDs));
  for (let name of listOfNames) {
    if (names === '') {
      names = names.concat(name);
    } else {
      names = names.concat(', ', name);
    }
  }
  $('.locations h4').text(names);
}

function citiesCheckBox () {
  const citiesID = $(this).attr('data-id');
  const citiesName = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    citiesIDs[citiesName] = citiesID;
  } else if ($(this).not(':checked')) {
    delete citiesIDs[citiesName];
  }
  let names = '';
  let listOfNames = Object.keys(statesIDs).concat(Object.keys(citiesIDs));
  for (let name of listOfNames) {
    if (names === '') {
      names = names.concat(name);
    } else {
      names = names.concat(', ', name);
    }
  }
  $('.locations h4').text(names);
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

function searchButton () {
  let listOfAmenIDs = [];
  let listOfCityIDs = [];
  let listOfStateIDs = [];
  let searchRequest = {};

  for (let amenName of Object.keys(amenitiesIDs)) {
    listOfAmenIDs.push(amenitiesIDs[amenName]);
  }
  for (let cityName of Object.keys(citiesIDs)) {
    listOfCityIDs.push(citiesIDs[cityName]);
  }
  for (let stateName of Object.keys(statesIDs)) {
    listOfStateIDs.push(statesIDs[stateName]);
  }
  Object.assign(searchRequest,
                {'amenities': listOfAmenIDs},
                {'states': listOfStateIDs},
                {'cities': listOfCityIDs});
  getPlaces(JSON.stringify(searchRequest));
}

function getPlaces (search = '{}') {
  $('.place').nextAll('section').remove();
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: search,
    contentType: 'application/json',
    success: function (data) {
      $('section.places').html('<h1>Places</h1>');
      for (let place of data) {
        $('section.places').append(
        $('<article></article>').append(
        $('<div class="price_by_night">').text('$' + place.price_by_night),
        $('<h2></h2>').text(place.name),
        $('<div class="informations"></div>').append(
          $('<div class="max_guest"></div>').text(place.max_guest + ' Guests'),
          $('<div class="number_rooms"></div>').text(place.number_rooms + ' Rooms'),
            $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms')),
            $('<div class="user"></div>').html('<b>Owner</b>: ' + 'D + R'),
            $('<div class="description"></div>').html(place.description)));
      }
    }
  });
}
