import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  experts: any;
  unSub: any;
  unSub1: any;
  isLoggedIn: any;
  role: any;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.unSub1 = this.activeRoute.queryParams.subscribe(params => {
      this.isLoggedIn = params['logged'];
      this.role = params['role'];
    });
    this.unSub = this.userService.getExperts().subscribe(d => this.experts = d.Experts);
  }

  ngOnDestroy() {
    this.unSub.unsubscribe();
  }

  startChat() {
    this.router.navigate(['donate'], {queryParams:{logged: this.isLoggedIn, role: this.role}});
  }
}
