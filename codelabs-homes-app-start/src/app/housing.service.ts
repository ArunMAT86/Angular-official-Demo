import { Injectable } from '@angular/core';
import { HousingLocationComponent } from './housing-location/housing-location.component';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  submitApplication(firstname: string, lastname: string, email: string) {
    console.log('Succesfully applied'   + '' + firstname, lastname, email);
  }

  url = 'http://localhost:3000/locations';

  constructor() { }

  async getAllHousingLocationList(): Promise<HousingLocation[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];

  }

   async getHousingLocationById(id: number):Promise<HousingLocation | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    console.log(data);
    return await data.json() ?? {};
   
  }
}
