import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResultcardComponent } from '../../cards/resultcard/resultcard.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ResultcardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  public modal = false;
  constructor(private authService : AuthService, private router: Router){}
  handleButtonClick(data: string) {
    this.modal = true;
    console.log('Button in child component clicked with data:', data);
    this.router.navigate(["/home/payment"]);
    // Add your logic here
  }

  closeModal(){
    this.modal = false;
  }
}
