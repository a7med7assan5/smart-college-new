import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var evothings: any;

@Component({
  selector: 'app-scan-beacon',
  templateUrl: './scan-beacon.page.html',
  styleUrls: ['./scan-beacon.page.scss'],
})
export class scanBeaconPage implements OnInit {

  beaconData: any;
  constructor(private change: ChangeDetectorRef, private platform: Platform) { }

  startScanningForBeacon() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.beaconData = data;
        console.log(this.beaconData);
        setTimeout(()=> {
          this.change.detectChanges();
        }, 1000);
      }, error => console.error(error));
    }
    )
  }

  ngOnInit() {
  }

}
