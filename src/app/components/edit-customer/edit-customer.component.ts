import { Component, OnInit } from '@angular/core';
import {Customer} from '../../model/Customer';
import{CustomerService} from '../../services/customer.service';
import{Router,ActivatedRoute,Params} from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

 

  customer: Customer = {
    firstName:'',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  };

 id:string;

  constructor(
    private cs:CustomerService,
    private fms: FlashMessagesService,
    private ar: ActivatedRoute,
    private router:Router,

  ) { }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }
  
  onSubmit({value,valid}:{value:Customer,valid:boolean}){
    if(valid){
      value.id = this.id; 
      this.cs.updateCustomers(value);
      this.fms.show('Customer saved',{cssClass:'alert-success',timeout:4000});
      this.router.navigate(['/customers']);
    }else{
      this.fms.show('All required fills must been filled',{cssClass:'alert-danger',timeout:4000});
    }
  }
  
}
