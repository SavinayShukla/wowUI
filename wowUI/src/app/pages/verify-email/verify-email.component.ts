import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PopupService } from '../../services/alerts/popup.service';


@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, MatProgressBarModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})


export class VerifyEmailComponent implements OnInit {
  uidb64: string = '';
  token: string = '';

  constructor(private route: ActivatedRoute, private router: Router, 
              private userService : UserService, private popup: PopupService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the values using the parameter names defined in your route
      this.uidb64 = params['uidb64'];
      this.token = params['token'];

      // Now you can use this.uidb64 and this.token in your component
      console.log('uidb64:', this.uidb64);
      console.log('token:', this.token);

      // You can also make backend calls or perform other logic here using these values
      // Example: this.myBackendService.verify(this.uidb64, this.token);
      
    });
  }

  verifyUser(){
    this.userService.verifyUser(this.uidb64, this.token).subscribe((response : any)=>{
      if(response){
        this.router.navigate(['/login']);
        this.popup.openSnackBar({
          message : "Verification Successfull! You may login.",
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
