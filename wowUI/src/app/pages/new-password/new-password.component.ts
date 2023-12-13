import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PopupService } from '../../services/alerts/popup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  uidb64: string = '';
  token: string = '';
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private popup: PopupService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the values using the parameter names defined in your route
      this.uidb64 = params['uidb64'];
      this.token = params['token'];

      // You can also make backend calls or perform other logic here using these values
      // Example: this.myBackendService.verify(this.uidb64, this.token);

    });
  }

  updatePassword() {
    const request = {
      password : this.newPassword
    }
    this.userService.newPassword(this.uidb64, this.token, request).subscribe((response : any)=>{
      if(response){
        this.router.navigate(['/login']);
        this.popup.openSnackBar({
          message : "Successfully updated password!",
          status : 'success',
          duration : 3000
        });
      }
    },
    (error) => {
      this.popup.openSnackBar({
        message : "Error - " + error.error.message,
        status : 'error',
        duration : 3000
      });
    });
  }
}
