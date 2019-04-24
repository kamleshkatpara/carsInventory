import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Manufacturer } from './manufacturer';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  private manufacturersUrl = environment.API_ENDPOINT + 'manufacturers';

  dataChange: BehaviorSubject<Manufacturer[]> = new BehaviorSubject<Manufacturer[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): Manufacturer[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getManufacturers(): void {
    this.http.get<Manufacturer[]>(this.manufacturersUrl).subscribe(data => {
      this.dataChange.next(data);
    }, (error: HttpErrorResponse) => {
      console.log(error.name + '' + error.message);
    });
  }

  getManufacturerNames(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.manufacturersUrl);
  }
  
  getManufacturer(id: string): Observable<Manufacturer> {
    const url = `${this.manufacturersUrl}/${id}`;
    return this.http.get<Manufacturer>(url);
  }

  addManufacturer(manufacturer: Manufacturer): void {
    this.http.post(this.manufacturersUrl, manufacturer).subscribe(data => {
      this.dialogData = manufacturer;
      console.log('Successfully added', 3000);
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }


  updateManufacturer(manufacturer: Manufacturer): void {
    const id = typeof manufacturer === 'string' ? manufacturer : manufacturer.id;
    const url = `${this.manufacturersUrl}/${id}`;
    this.http.put(url, manufacturer, httpOptions).subscribe(data => {
      this.dialogData = manufacturer;
      console.log('Successfully update', 3000);
    }, (err: HttpErrorResponse) => {
      console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
  }

  deleteManufacturer(manufacturer: Manufacturer | string): void {
    const id = typeof manufacturer === 'string' ? manufacturer : manufacturer;
    const url = `${this.manufacturersUrl}/${id}`;
    this.http.delete(url, httpOptions).subscribe(data => {
      console.log('Successfully deleted', 3000);
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


}
