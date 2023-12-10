import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'comp-order',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './comp-orders.component.html',
  styleUrl: './comp-orders.component.css'
})
export class CompOrdersComponent{
  @Input() orderData: any;

}
