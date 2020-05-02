import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() emitEvent;
  @Output() navClicked = new EventEmitter();


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(location) {
    this.navClicked.emit(location);

    // this.router.navigate([], {queryParams: {
    //   view: location
    //   }}).finally(() => {});
  }
}
