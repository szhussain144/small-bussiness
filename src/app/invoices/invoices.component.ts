import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/api/invoice.service';
import { SessionService } from '../services/common/session.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from "@progress/kendo-data-query";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding!: DataBindingDirective;
  invoices: any[] = [];
  public gridView: unknown[] = [];

  constructor(private invoiceService:InvoiceService, private router:Router, private sessionService:SessionService){}
  
  ngOnInit(): void {
    this.invoiceService.getAllInvoices().subscribe(res => {
      this.invoices = res.payload;
      this.gridView = this.invoices;
    });
  }

  viewInvoice(invoice: any) {
    this.sessionService.invoiceData.next(invoice);
    this.router.navigate(['view-invoice/'+invoice.id]);
    console.log('View Invoice:', invoice);
  }

  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;

    this.gridView = process(this.invoices, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "customer.name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "amount",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "invoiceDate",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "supplier.name",
            operator: "contains",
            value: inputValue,
          }
        ],
      },
    }).data;

    // this.dataBinding.skip(0);
  }
}
