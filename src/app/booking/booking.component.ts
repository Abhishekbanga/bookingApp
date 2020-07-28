import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { } from 'googlemaps';
// declare var google;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements AfterViewInit, OnInit {
  @ViewChild('mapInput', {}) gmap: ElementRef;
  public distaneCounter = 0;
  public pathCovered;
  public pathCoveredCoordinates = [];
  public defaultLatLong;
  public path;
  public startToEnd;
  public labels = 'AB';
  public labelIndex = 0;
  public imgCar;
  public marker;

  map: google.maps.Map;
  lat = 30.7335;
  lng = 76.7800;

  center = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 13
  };
  ngOnInit() {
  }
  ngAfterViewInit() {
    // random Default path
    this.defaultLatLong = [
      { lat: 30.7365, lng: 76.7300 },
      { lat: 30.7355, lng: 76.7600 },
      { lat: 30.7340, lng: 76.7700 },
      { lat: 30.7335, lng: 76.7800 },
      { lat: 30.7330, lng: 76.7900 },
      { lat: 30.7320, lng: 76.8000 },
      { lat: 30.7315, lng: 76.8010 },
      { lat: 30.7304, lng: 76.8015 },
    ];

    // loading map
    this.map = new google.maps.Map(
      this.gmap.nativeElement,
      this.mapOptions
    );
    // path properties
    this.path = new google.maps.Polyline({
      path: this.defaultLatLong,
      geodesic: false,
      strokeColor: '#63e810',
      strokeOpacity: 0.2,
      strokeWeight: 5
    });
    this.path.setMap(this.map);
    // Marking destination latlong
    this.startToEnd = [
      { position: new google.maps.LatLng(30.7304, 76.8015) },
      { position: new google.maps.LatLng(30.7365, 76.7300) }
    ];

    for (const startToEnd of this.startToEnd) {
      this.marker = new google.maps.Marker({
        position: startToEnd.position,
        label: this.labels[this.labelIndex++ % this.labels.length],
        map: this.map
      });
    }

    // img property for marker used
    this.imgCar = new google.maps.Marker({
      position: this.startToEnd[0].position,
      icon: '../../assets/rsz_car.png',
      map: this.map
    });

    setInterval(() => {
      this.changeCarPosition(this.imgCar);
    }, 2000);

  }


  // Changing path function
  changeCarPosition(imgCar) {
    this.distaneCounter++;
    for (let j = this.defaultLatLong.length - this.distaneCounter; j >= 0; j--) {
      const latlng = new google.maps.LatLng(this.defaultLatLong[j].lat, this.defaultLatLong[j].lng);

      // updating latlong for path //
      imgCar.setPosition(latlng);
      this.pathCoveredCoordinates.push({
        lat: this.defaultLatLong[j].lat,
        lng: this.defaultLatLong[j].lng
      });

      // changing color of path
      this.pathCovered = new google.maps.Polyline({
        path: this.pathCoveredCoordinates,
        geodesic: false,
        strokeColor: '#63e810',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.pathCovered.setMap(this.map);
      break;
    }
  }



}
