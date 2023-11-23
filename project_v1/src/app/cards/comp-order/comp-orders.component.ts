import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comp-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp-orders.component.html',
  styleUrl: './comp-orders.component.css'
})
export class CompOrdersComponent {
  public cardToggle = false;
  openCard() {
    this.cardToggle = !this.cardToggle;
  }
}
