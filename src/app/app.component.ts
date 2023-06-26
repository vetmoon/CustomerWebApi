import { Component, OnInit } from '@angular/core';
import { Customer } from './Models/Customer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from './Service/customer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Customerary: Customer[] = [];
  Customerformgroup: FormGroup;
  constructor(private cusservice: CustomerService, private fb: FormBuilder) {
    this.Customerformgroup = this.fb.group({
      id: [""],
      name: [""],
      mobileNo: [""],
      emailID: [""]
    })
  }
  ngOnInit(): void {
    this.getcustomers();
  }
  getcustomers() {
    this.cusservice.GetCustomer().subscribe(response => {
      console.log(response);
      this.Customerary = response;
    })
  }
  Onsubmit() {
    console.log(this.Customerformgroup.value);
    if (this.Customerformgroup.value.id != null && this.Customerformgroup.value.id != "") {
      this.cusservice.UpdateCustomer(this.Customerformgroup.value).subscribe((response: Customer) => {
        console.log(response);
        this.getcustomers();
        this.Customerformgroup.setValue({
          id: "",
          name: "",
          mobileNo: "",
          emailID: "",
        });
      });
    }
     else {
      this.cusservice.CreateCustomer(this.Customerformgroup.value).subscribe((response: Customer) => {
        console.log(response);
        this.getcustomers();
        this.Customerformgroup.setValue({
          id: "",
          name: "",
          mobileNo: "",
          emailID: "",
        });
      });
    }
  }
  Fillform(cus: Customer) {
    this.Customerformgroup.setValue({
      id: cus.id,
      name: cus.name,
      mobileNo: cus.mobileNo,
      emailID: cus.emailID,
    })
  }
  DeleteCus(id: string) {
    this.cusservice.DeleteCustomer(id).subscribe(response => {
      console.log(response);
      this.getcustomers();
    })
  }

  title = 'angularcrud';
}

