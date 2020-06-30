import { Component, OnInit } from '@angular/core';

declare var WifiWizard2: any;


@Component({
  selector: 'app-scan-wifi',
  templateUrl: './scan-wifi.page.html',
  styleUrls: ['./scan-wifi.page.scss'],
})
export class scanWifiPage implements OnInit {

  constructor() { }

    results = [];
    info_txt = "";
    async getNetworks() {
      this.info_txt = "loading...";
      try {
        let results = await WifiWizard2.scan();
        this.results = results;
        this.info_txt = "";
      } catch (error) {
        this.info_txt = error;
      }
    }

    ngOnInit(): void {
    }
}
