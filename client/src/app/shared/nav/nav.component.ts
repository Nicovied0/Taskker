import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private router: Router) {}

  active = false;
  enOn = false;
  esOn = true;

  ngOnInit() {}

  goHome() {
    this.router.navigate(['']);
    this.noShowBurger();
  }

  goAboutUs() {
    this.router.navigate(['/aboutUs']);
    this.noShowBurger();
  }

  goSupport() {
    this.router.navigate(['/support']);
    this.noShowBurger();
  }

  goDashboard() {
    this.router.navigate(['/auth']);
    this.noShowBurger();
  }

  showBurger() {
    this.active = !this.active;
  }

  noShowBurger() {
    this.active = false;
  }
}
