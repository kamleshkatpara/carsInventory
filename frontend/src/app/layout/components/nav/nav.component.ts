import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from './../../../shared/services/users/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUsername = localStorage.getItem('currentUsername');

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver,
              private usersService: UsersService) { }

  ngOnInit() {
  }

  logout() {
    if (confirm('Are you sure to logout ?')) {
      console.log('User logged out successfully');
      this.usersService.logout();
      window.location.reload();
    } else {
      console.log('Logout attempt cancelled !');
    }
  }
}
