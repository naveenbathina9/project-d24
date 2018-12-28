import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digi24',
  templateUrl: './digi24.component.html',
  styleUrls: ['./digi24.component.scss']
})
export class Digi24Component implements OnInit {
loaderTemplate: string = `<img src="assets/iconfonts/ajax-loader.gif" />`;

  constructor() { }

  ngOnInit() {
  }

}
