import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public selected = "Inbox";

  public menuItems: any[] = [
    {
      text: 'Products',
      url:'/products',
      icon: 'cart',
      items: []
    },
    {
      text: 'My Products',
      url: '/my-products',
      icon: 'cart',
      items: []
    },
    {
      text: 'Purchase Order',
      icon: 'grid',
      url:'/purchase-order',
      items: []
    },
    {
      text: 'Invoices',
      icon: 'grid',
      url:'/invoice',
      items: []
    },
    {
      text: 'Reporting',
      icon: 'grid',
      url:'report',
      items: []
    }
  ];
}
