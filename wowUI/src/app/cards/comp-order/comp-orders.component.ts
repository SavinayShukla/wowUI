import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import moment from 'moment';
import { MetadataService } from '../../services/metadata.service';

@Component({
  selector: 'comp-order',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './comp-orders.component.html',
  styleUrl: './comp-orders.component.css'
})
export class CompOrdersComponent implements OnInit {
  @Input() orderData: any;
  pricingInfo: any;
  user: any;
  constructor(private metadataService: MetadataService) { }
  ngOnInit(): void {

    this.metadataService.fetchMetaData().subscribe((response) => {
      this.user = response.user;
    })

    const start_odo = this.orderData.start_odo;
    const end_odo = this.orderData.end_odo;
    const daily_limit = this.orderData.daily_limit;
    const miles = Math.round(end_odo - start_odo);
    const vehicle_rate = this.orderData.vehicle_id.class_id.rent_charge;
    const extra_rate = this.orderData.vehicle_id.class_id.extra_charge;

    //Calculate Days
    const startMoment = moment(this.orderData.pickup_date);
    const endMoment = moment(this.orderData.dropoff_date);
    var days  = endMoment.diff(startMoment, 'days') + 1;

    //Taxes
    const taxes = 1.99;
    
    let subtotal = days * vehicle_rate;
    let extra_charge = ((miles > daily_limit) ? (miles - daily_limit) * extra_rate : 0.00)
    const grand_total = subtotal + extra_charge + taxes;
    const pay_date = moment(this.orderData.dropoff_date).format("MM/DD/YYYY");
    const order_number = this.orderData.booking_id;
    const isMultipleCards = (this.orderData.payment.length > 1)
    // const discount = (this.orderData.coupoon_id == null ? null : discount)

    this.pricingInfo = {
      start_odo: start_odo,
      end_odo: end_odo,
      daily_limit: daily_limit,
      miles: miles,
      vehicle_rate: vehicle_rate,
      extra_rate: extra_rate,
      taxes: taxes,
      subtotal: subtotal,
      extra_charge: extra_charge,
      grand_total: grand_total,
      pay_date: pay_date,
      order_number: order_number,
      isMultipleCards : isMultipleCards
    }

    console.log(this.pricingInfo);
  }
}
