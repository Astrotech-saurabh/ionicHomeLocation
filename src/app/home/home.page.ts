import { Component, NgZone } from '@angular/core';
import { Capacitor, Plugins } from "@capacitor/core";
import { LocationService } from '../location.service';
const { Geolocation, Toast } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lat: any;
  lng: any;
  watchId: any;
  locationArray = [];
  constructor(public ngZone: NgZone, private locationService: LocationService) {
    // this.locationArray = [
    //   { lat: 21.207335996812972, lng: 79.18118205769558 },
    //   { lat: 21.207778595808662, lng: 79.18184992772956 },
    //   // { lat: "21.208488751880793", lng: "79.18314007024996" },
    //   // { lat: "21.208826324875993", lng: "79.1831400702521" },
    // ]
    // this.locationArray.forEach(element => {
    //   this.lat = element.lat;
    //   this.lng = element.lng;
    // });
    this.lat = 21.208923637779424;
    this.lng = 79.17884626784016;
  }

  async getMyLocation() {
    const hasPermission = await this.locationService.checkGPSPermission();
    if (hasPermission) {
      if (Capacitor.isNative) {
        const canUseGPS = await this.locationService.askToTurnOnGPS();
        this.postGPSPermission(canUseGPS);
      }
      else { this.postGPSPermission(true); }
    }
    else {
      const permission = await this.locationService.requestGPSPermission();
      if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
        if (Capacitor.isNative) {
          const canUseGPS = await this.locationService.askToTurnOnGPS();
          this.postGPSPermission(canUseGPS);
        }
        else { this.postGPSPermission(true); }
      }
      else {
        await Toast.show({
          text: 'User denied location permission'
        })
      }
    }
  }

  async postGPSPermission(canUseGPS: boolean) {
    if (canUseGPS) { this.watchPosition(); }
    else {
      await Toast.show({
        text: 'Please turn on GPS to get location'
      })
    }
  }

  async watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        this.ngZone.run(() => {
          if (err) { console.log('err', err); return; }
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude
          this.clearWatch();
        })
      })
    }
    catch (err) { console.log('err', err) }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
}