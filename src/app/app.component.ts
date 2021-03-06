import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    let path = window.location.pathname;
    if (path == null || path === '' || path === '/') { path = 'home'; }
    this.router.navigate([path]).then(data => {
      console.log('Route exists, redirection is done');
    }).catch(e => {
      this.router.navigate(['home']);
    });
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
