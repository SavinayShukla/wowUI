import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-resultcard',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './resultcard.component.html',
  styleUrl: './resultcard.component.css'
})
export class ResultcardComponent {

  @Output() buttonClick = new EventEmitter();
  @Input() resultData: any;

  constructor(private sharedService: SharedService){}
  
  onButtonClick() {
    this.sharedService.updateResultCardData(this.resultData);
    this.buttonClick.emit("Something");
  }
}
