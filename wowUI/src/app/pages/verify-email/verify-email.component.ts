import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, MatProgressBarModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  disabled = false;
  button = false;

  emulateCapthca(){
    console.log("asdadad");
    if(this.disabled){
      setTimeout(()=>{
        this.button = true;
      },2000);
    }
    else{
      this.button = false;
    }
  }
}
