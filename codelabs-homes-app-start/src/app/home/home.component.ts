import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by City" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
      </section>
   <section class="results">
    <app-housing-location 
    *ngFor="let housingLocationItem of filteredHousingLocationList" 
    [housingLocation]="housingLocationItem">
    </app-housing-location>
    </section>

      <!-- <section class="results">
        <app-housing-location *ngFor="let housingLocationitems of housingLocationList" [housingLocation]="housingLocationitems"
        ></app-housing-location>
      </section> -->
    
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  housingLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  filteredHousingLocationList: HousingLocation[] =[];

  constructor(){
    this.housingService.getAllHousingLocationList().then((housingLocationList: HousingLocation[])=>{
      this.housingLocationList = housingLocationList;
      this.filteredHousingLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if(!text) this.filteredHousingLocationList = this.housingLocationList;
    this.filteredHousingLocationList = this.housingLocationList.filter(housingLocation=>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
    
    }

}
