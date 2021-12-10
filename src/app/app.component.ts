import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  unsub: any;
  role?: string;

  constructor(private tokenStorageService: TokenStorageService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.unsub = this.activeRoute.queryParams.subscribe(params => {
      this.isLoggedIn = params['logged'];
      this.role = params['role'];
    });


    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.user.name;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
