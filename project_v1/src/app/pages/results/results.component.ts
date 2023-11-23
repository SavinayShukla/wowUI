import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResultcardComponent } from '../../cards/resultcard/resultcard.component';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ResultcardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit{
  // public modal = false;
  //Search Results goes here.
  searchResults: any[] = [];

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  public ngOnInit(): void {

    //Here Subscribe to the Search Result API
    this.dataService.getResults().subscribe(data => {
      this.searchResults = data.cars;
      console.log(data.cars);
    });
  }


  //This method will be clicked when user, 
  //Clicks on a particular card
  //Will be redirected to payment page.
  handleButtonClick(data: string) {
    this.router.navigate(["/home/payment"]);
    // Add your logic here
  }
}
