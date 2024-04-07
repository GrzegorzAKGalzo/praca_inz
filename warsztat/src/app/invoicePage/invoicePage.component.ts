import { Component, OnInit } from '@angular/core';
import { LoginapiService } from '../loginapi.service';
import { Invoice } from '../invoice';
import { Repair } from '../repair';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-invoicePage',
  templateUrl: './invoicePage.component.html',
  styleUrls: ['./invoicePage.component.css']
})
export class InvoicePageComponent implements OnInit {
  public invoice!: Invoice;
  public invoices: Invoice[] = [];
  public endedJobs: Repair[] = [];
  public showModal:boolean = false;
  public isLoading:boolean = true;
  public typeForm = "";
  title = "Faktury" ;
  constructor(
    private apiService: LoginapiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getInvoices();
  }
  getInvoices(){
    this.apiService.getRepairs().subscribe({
      next: (response:any) => {
        this.endedJobs = response;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
          this.isLoading = false; // Set isLoading to false when all requests are completed
          this.endedJobs = this.endedJobs.filter(job => job.status === 3);
          console.log(this.endedJobs);
          this.endedJobs.forEach(job => {
            this.apiService.getInvoice(job.id).subscribe({
              next: (response:any) => {
                this.invoice = {
                  name: "F/" + response[0].client_name.charAt(0) + response[0].client_lastname.charAt(0) + new Date(response[0].repair_end_date).getFullYear() + new Date(response[0].repair_end_date).getMonth()  + new Date(response[0].repair_end_date).getDay(),
                  client: response[0].client_name + response[0].client_lastname,
                  email: response[0].client_email,
                  phone: response[0].client_number,
                  nip: response[0].client_nip,
                  total: 0,
                  date: new Date(response[0].repair_end_date),
                  repairs: [],
                }
                response.forEach((el: any) => {
                  console.log(el);
                    this.invoice.repairs.push({ id: 0, name: el.repair_type, price:parseFloat( el.repair_price)})
                  });
                  this.invoice.total = this.invoice.repairs.reduce((acc, repair) => acc + repair.price, 0);
                  this.invoices.push(this.invoice);
              },
              error: (error: any) => {
                console.log(error);
              },
              complete: () => {
                console.log(this.invoice);
              }
            });
          });
      }
    });
  }

  closeModal(){
    this.showModal = !this.showModal;
  }

   printInvoice(): void {
    window.print();
  }
  openModal(index: number){
    this.invoice = this.invoices[index];
    this.showModal = !this.showModal;
  }


}
