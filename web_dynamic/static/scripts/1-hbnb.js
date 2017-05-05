let amenitiesIDs = new Map();
$(document).ready(function () {
  $('input:checkbox').change(amenitiesCheckBox);
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
