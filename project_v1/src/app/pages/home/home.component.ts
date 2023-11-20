import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService : AuthService, private router: Router) {}

  onSubmit() {
    // Perform form processing here
    // ...
    // call CheckUser(ob)

    // Navigate to the new component upon form submission
    
    // if(this.authService.login()){
    //   this.router.navigate(['/home']);
    // }
    this.router.navigate(['home/results'])
  }
}
