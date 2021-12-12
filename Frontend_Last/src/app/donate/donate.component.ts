import { AbstractType, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
})
export class DonateComponent {
  paymentHandler: any = null;
  unsub: any;
  isLoggedIn: any;
  role?: any;
  paymentDone = false;
  errorMessage = '';
  currentUser: any;
  room?: any;
  amount = 0;

  constructor(
    private token: TokenStorageService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.unsub = this.activeRoute.queryParams.subscribe((params) => {
      this.isLoggedIn = params['logged'];
      this.role = params['role'];
      this.room = params['room'];
    });
    this.currentUser = this.token.getUser();
    this.invokeStripe();
  }

  startChat() {
    let data = {
      email: this.currentUser.user.email,
      username: this.currentUser.user.email,
      room: this.room,
    };
    this.userService.startChat(data).subscribe(
      (d) => {
        console.log(d);
        this.router.navigate(['home'], {
          queryParams: { logged: this.isLoggedIn, role: this.role },
        });
        window.open(d.url);
      },
      (err) => {
        this.errorMessage = err.error.error;
      }
    );
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      // key: 'pk_test_51K1a0NJO0kMgjOQWgmwdzH8Natt0xu2SZ2WSTAa9mN7yv7rKLQjLyGJbz3OropuIirR1cnWgOQdUZZQd9XDvqB5X00rJZowO5f',
      key: 'pk_test_51K1a0NJO0kMgjOQWgmwdzH8Natt0xu2SZ2WSTAa9mN7yv7rKLQjLyGJbz3OropuIirR1cnWgOQdUZZQd9XDvqB5X00rJZowO5f',

      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Payment has been Successful!');
      },
    });

    paymentHandler.open({
      name: 'MAKE A PAYMENT',
      description: 'You keep us going....',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51K1a0NJO0kMgjOQWgmwdzH8Natt0xu2SZ2WSTAa9mN7yv7rKLQjLyGJbz3OropuIirR1cnWgOQdUZZQd9XDvqB5X00rJZowO5f',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);

            window.open('https://www.youtube.com/');

            alert('Payment has been successful!');
          },
        });
      };

      window.document.body.appendChild(script);
      setTimeout(() => {
        this.paymentDone = true;
      }, 10000);
    }
  }
}
