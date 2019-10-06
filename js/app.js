var z=19;
const TILE_SIZE = 256;
var lat= 20.8688;
var log=-103.2195;

function createInfo(latLng, zoom) {
  var scale = 1 << zoom;

  var worldCoordinate = project(latLng);

  var pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale),
      Math.floor(worldCoordinate.y * scale));

  var tileCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale / TILE_SIZE),
      Math.floor(worldCoordinate.y * scale / TILE_SIZE));
      
      localStorage.setItem( 'coordX', tileCoordinate.x );
      localStorage.setItem( 'coordY', tileCoordinate.y );
      localStorage.setItem( 'zoom' , z );
      console.log(tileCoordinate);
      console.log("Memoria"+ localStorage.getItem('coordX'));
      console.log("Memoria"+ localStorage.getItem('coordY'));//
      console.log("Memoria"+ localStorage.getItem('zoom'));

  return [
    'LatLng: ' + latLng,
    'Zoom level: ' + zoom,
    'World Coordinate: ' + worldCoordinate,
    'Pixel Coordinate: ' + pixelCoordinate,
    'Tile Coordinate: ' + tileCoordinate
  ].join('<br>');
}

function project(latLng) {
  var siny = Math.sin(latLng.lat() * Math.PI / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: log},
      zoom: z,
      //mapTypeControl: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.COORDENATE, //coordenate
      tilt: 0 
    });

    var input = document.getElementById('pac-input');
    
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocomplete.addListener('place_changed', function() {
     
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport ) {
      console.log(place);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng()); 
      console.log(createInfo(place.geometry.location, z ));     
      //function addWindow(a) { 
     //   var b = window.open("container.html", a, DEFAULT_POPUP_PROPERTIES); 
     //   b.settings = { x: 0, y: 0, width: 100, height: 100 }, windows.push(b), this[a] = b 
    //}
      window.open("sec.html", "_parent");//"_self"/            
    } ///////
  });
}