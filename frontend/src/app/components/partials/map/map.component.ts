import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import { MapService } from 'src/app/services/map.service';
import { IOrder } from 'src/app/shared/models/order.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() order!: IOrder;

  private readonly DEFAULT_LATLNG: LatLngTuple = [50.47, 30.47];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://www.svgrepo.com/show/513317/location-pin.svg',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  @ViewChild('map', { static: true }) mapRef!: ElementRef;

  map!: Map;
  currMarker!: Marker;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1); //1 - zoom level

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.findMyLocation();

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  findMyLocation() {
    this.mapService.getCurrLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;

    if (this.currMarker) {
      this.currMarker.setLatLng(latlng);
      return;
    }
    this.currMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    this.currMarker.on('dragend', () => {
      this.addressLatLng = this.currMarker.getLatLng();
    });
  }

  set addressLatLng(latlng: LatLng) {
    // toFixed(8) for mongodb, because it can't get another value
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }
}
