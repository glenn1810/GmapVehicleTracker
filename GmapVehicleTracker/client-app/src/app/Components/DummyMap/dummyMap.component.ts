import { OnInit, Component } from '@angular/core';


declare function initializeDummyGoogleMap(): any;

@Component({
  selector: 'app-dummyMap',
  templateUrl: './dummyMap.component.html',
  styleUrls: ['./dummyMap.component.scss']
})
export class DummayMapComponent implements OnInit {
  ngOnInit(): void {
    //console.log("Dummy Map");
    initializeDummyGoogleMap();

  }
}
