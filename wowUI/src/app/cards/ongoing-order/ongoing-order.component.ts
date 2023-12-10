import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ongoing-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ongoing-order.component.html',
  styleUrl: './ongoing-order.component.css'
})
export class OngoingOrderComponent {
  @Output() dataEvent = new EventEmitter<any>();
  @Input() orderData: any;

  sendData(command_status : string) {
    const requestData = {
      command : command_status,
      booking: this.orderData,
    }
    this.dataEvent.emit(requestData);
  }
}
