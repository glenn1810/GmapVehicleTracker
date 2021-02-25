import { Component, SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular10';



  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onRouteChanged(): void {

  }

}


