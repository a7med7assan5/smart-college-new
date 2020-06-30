import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx'
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QRScannerPage implements OnInit {
  qrScan: any;
  constructor(public platform: Platform, public dialog: Dialogs, public qr: QRScanner) { 
    //Now disable scanning when back button is pressed
    this.platform.backButton.subscribeWithPriority(0, ()=> {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();

    })
  }

  StartScanning() {
    this.qr.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qr.show();
        document.getElementsByTagName("body")[0].style.opacity = "0";
        this.qrScan = this.qr.scan().subscribe((textfound) => {
          document.getElementsByTagName("body")[0].style.opacity = "1";
          this.qrScan.unsubscribe();
          this.dialog.alert(textfound);

        }, (err) => {
          this.dialog.alert(JSON.stringify(err));
        })
      }
      else if (status.denied) {

      } else {

      }

    })
  }

  ngOnInit() {
  }

}
