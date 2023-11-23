import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompOrdersComponent } from '../../cards/comp-order/comp-orders.component';
import { PendOrderComponent } from '../../cards/pend-order/pend-order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CompOrdersComponent, PendOrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  warning = false;
  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }

  receiveData(data: string) {
    this.openModal();
  }
}
