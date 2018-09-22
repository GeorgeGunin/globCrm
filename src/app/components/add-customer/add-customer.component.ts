import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Customer } from '../../model/Customer';
import { CustomerService} from '../../services/customer.service';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {ViewChild, ElementRef,NgZone} from '@angular/core';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  firstName:string = '';
  lastName:string = '';
  phone:string = '';
  email:string = '';
  address:string = '';
  notes:string = '';

 @ViewChild('search') public searchElement:ElementRef;

  constructor(
    private fms:FlashMessagesService,
    private cs: CustomerService,
    private router: Router,
    private mapsAPILoader:MapsAPILoader,
    private ngZone:NgZone
  
  ) { }

  ngOnInit() {
   
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );

   }

  onSubmit({value,valid}:{value:Customer,valid:boolean}){
    
    if(!valid){
    
     this.fms.show('Please fill all required fields',{
      cssClass: 'alert-danger mb-5', timeout: 4000
    }); 

    }else{
    
      this.cs.addCustomer(value);

      this.fms.show('Customer saved',{
        cssClass: 'alert-success mb-5', timeout: 4000
      }); 

      this.router.navigate(['/customers']);

    }

  }

}
