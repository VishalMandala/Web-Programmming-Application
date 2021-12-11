import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  expertForm: any = {
    name: null,
    email: null
  };
  patientForm: any = {
    firstname: null,
    email: null
  };
  success = false;
  logged = false;
  unsub: any;
  role?: string;
  formError= false;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.unsub = this.activeRoute.queryParams.subscribe(params => {
      this.logged = params['logged'];
      this.role = params['role'];
    });
  }

  goToProfile() {
    this.router.navigate(['profile'], {
      queryParams: { logged: this.logged, role: this.role },
    });
  }

  onSubmit(): void {

    if(this.role == 'expert'){
      let data = null;
      let d = this.expertForm;
      if(d.name == null && d.email == null) {
      }
      else if(d.name == null) {
        data = Object.assign({ email: d.email});
      }
      else if(d.email == null) {
        data = Object.assign({ name: d.name});
      } else {
        data = this.expertForm;
      }
      this.authService.updateExpertProfile(this.currentUser.user._id, data).subscribe(
        (d) => {
          window.alert('Your request submitted successfully!');
          this.router.navigate(['profile'], {
            queryParams: { logged: this.logged, role: this.role },
          });
        },
        (err) => {
          window.alert('Your request Failed, please check the information entered and resubmit!');
        }
      );
    }

    if(this.role == 'patient'){
      let data = null;
      let d = this.patientForm;
      if(d.firstname == null && d.email == null) {
      }
      else if(d.firstname == null) {
        data = Object.assign({ email: d.email});
      }
      else if(d.email == null) {
        data = Object.assign({ firstname: d.firstname});
      } else {
        data = this.patientForm;
      }

      this.authService.updatePatientProfile(this.currentUser.user._id, data).subscribe(
        (d) => {
          window.alert('Your request submitted successfully!');
          this.router.navigate(['profile'], {
            queryParams: { logged: this.logged, role: this.role },
          });
        },
        (err) => {
          window.alert('Your request Failed, please check the information entered and resubmit!');
        }
      );
    }
  }
}
