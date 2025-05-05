import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  
      <article>
        <img class="listing-photo" [src]="housingLocation?.photo" />
        <section class="listing-description">
          <h2 class="listing-heading">{{housingLocation?.name}}</h2>
          <p class="listing-location">{{housingLocation?.city}},{{housingLocation?.state}}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">About this housing location</h2>
          <ul>
            <li>Units Available: {{housingLocation?.availableUnits}}</li>
            <li>Does this location have WIFI: {{housingLocation?.wifi}}</li>
            <li>Does this location have Laundry: {{housingLocation?.laundry}}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Apply to Live Here</h2>
          <form [formGroup]="applyForm" (ngSubmit)="SubmitApplyForm()">
            <label for="first-name">Firstname</label>
            <input id="first-name" type="text" formControlName="firstname">

            <label for="last-name">Lastname</label>
            <input id="last-name" type="text" formControlName="lastname">

            <label for="email">Email</label>
            <input id="email" type="text" formControlName="email">
            <button class="btn-primary"  [disabled]="!applyForm.valid" type="submit">Submit</button>
          </form>
        </section>
      </article>
    
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {


SubmitApplyForm() {
  
  this.housingService.submitApplication(
    this.applyForm.value.firstname ?? '',
    this.applyForm.value.lastname ?? '',
    this.applyForm.value.email ?? '');
    console.log("Form submitted!", this.applyForm.value);
}

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService =  inject(HousingService);
  housingLocation: HousingLocation | undefined;

  housingLocationId = 0;

  applyForm = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email)
  });


  constructor(){
     const housingLocationId = Number(this.route.snapshot.params['id']);
      this.housingService.getHousingLocationById(housingLocationId).then(housingLocation=>{
      this.housingLocation = housingLocation;
    });
  }



}
