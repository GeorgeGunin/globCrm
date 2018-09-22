import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/Customer';
import { CustomerService } from '../../services/customer.service';
import { Router , ActivatedRoute , Params } from '@angular/router'

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  id:string;
  customer:Customer={

    id:'',
    firstName:'',
    lastName :'',
    email:'',
    phone :'',
    address :'',
    notes:''
  };

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private cs:CustomerService,
  ) { }

  ngOnInit() {

    this.id = this.ar.snapshot.params['id'];
    this.cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

}
