import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent {

  paymentHandler:any = null;
  unsub: any;
  isLoggedIn: any;
  role?: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.unsub = this.activeRoute.queryParams.subscribe(params => {
      this.isLoggedIn = params['logged'];
      this.role = params['role'];
    });
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51K1a0NJO0kMgjOQWgmwdzH8Natt0xu2SZ2WSTAa9mN7yv7rKLQjLyGJbz3OropuIirR1cnWgOQdUZZQd9XDvqB5X00rJZowO5f',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Payment has been successfull!');
      }
    });

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51K1a0NJO0kMgjOQWgmwdzH8Natt0xu2SZ2WSTAa9mN7yv7rKLQjLyGJbz3OropuIirR1cnWgOQdUZZQd9XDvqB5X00rJZowO5f',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }

}
