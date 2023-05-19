import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/common/session.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit{
  currentDate: Date = new Date();
  invoiceItems: Array<any> = [];
  constructor(private commonService:SessionService){}
  
  ngOnInit(): void {
    this.commonService.invoiceData.subscribe((res)=>{
      this.invoiceItems.push(res);
    });
  }
}
