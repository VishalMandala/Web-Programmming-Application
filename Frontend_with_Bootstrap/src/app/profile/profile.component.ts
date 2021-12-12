import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  data: any;
  unsub1: any;
  unsub2: any;
  isLoggedIn: any;
  role: any;


  constructor(private token: TokenStorageService, private userService: UserService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.unsub1 = this.activeRoute.queryParams.subscribe(params => {
      this.isLoggedIn = params['logged'];
      this.role = params['role'];
    });
    this.currentUser = this.token.getUser();
    if(this.role == 'expert'){
      this.unsub2 = this.userService.getExpert(this.currentUser.user._id).subscribe(d => this.data = d.expert);
    } else {
      this.unsub2 = this.userService.getUser(this.currentUser.user._id).subscribe(d => this.data = d.user);
    }

  }

  goToUpdateProfile() {
    this.router.navigate(['update-profile'], {
      queryParams: { logged: this.isLoggedIn, role: this.role },
    });
  }
}
