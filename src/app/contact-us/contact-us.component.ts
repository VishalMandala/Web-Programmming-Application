import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    category: null,
  };
  success = false;
  logged = false;
  unsub: any;
  role?: string;

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unsub = this.activeRoute.queryParams.subscribe(params => {
      this.logged = params['logged'];
      this.role = params['role'];
    });
  }

  goToHome() {
    this.router.navigate(['home'], {
      queryParams: { logged: this.logged, role: this.role },
    });
  }

  onSubmit(): void {
    const data = this.form;

    this.authService.contactUs(data).subscribe(
      (d) => {
        window.alert('Your request submitted successfully!');
        this.router.navigate(['home'], {
          queryParams: { logged: this.logged, role: this.role },
        });
      },
      (err) => {
        window.alert('Your request Failed, please check the information entered and resubmit!');
      }
    );
  }
}
