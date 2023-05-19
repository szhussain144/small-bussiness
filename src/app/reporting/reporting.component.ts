import { Component } from '@angular/core';
import { InvoiceService } from '../services/api/invoice.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
})
export class ReportingComponent {
  public salesData: any[] = [];
  public filteredData: any[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  constructor(private invoice:InvoiceService) {
    this.filteredData = this.salesData;
  }

  ngOnInit():void{
    this.invoice.getReportingData().subscribe((res)=>{
      if(res){
        this.salesData = res.payload;
        this.filteredData = this.salesData;
      }
    })
  }

  public filterDataByDate(): void {
    this.filteredData = this.salesData.filter((element) => {
      const elementDate = new Date(element.date);
      console.log(elementDate," : ",new Date(this.fromDate)," : ",new Date(this.toDate))
      return elementDate >= new Date(this.fromDate) && elementDate <= new Date(this.toDate);
    });
  }
}
