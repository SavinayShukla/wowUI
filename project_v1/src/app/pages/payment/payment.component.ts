import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatSelectModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  selectedCarData: any;

  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    this.sharedService.searchCardData$.subscribe(data => {
      this.selectedCarData = data;
    });
  }
  
  warning = false;
  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }
}
