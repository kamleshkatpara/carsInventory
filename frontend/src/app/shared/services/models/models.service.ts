import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Model } from './model';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private modelsUrl = environment.API_ENDPOINT + 'models';

  dataChange: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): Model[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getModels(): void {
    this.http.get<Model[]>(this.modelsUrl).subscribe(data => {
      this.dataChange.next(data);
    }, (error: HttpErrorResponse) => {
      console.log(error.name + '' + error.message);
    });
  }

  getModel(id: string): Observable<Model> {
    const url = `${this.modelsUrl}/${id}`;
    return this.http.get<Model>(url);
  }

  addModel(model: Model): void {
    this.http.post(this.modelsUrl, model).subscribe(data => {
      this.dialogData = model;
      console.log('Successfully added', 3000);
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }


  updateModel(model: Model): void {
    const id = typeof model === 'string' ? model : model.id;
    const url = `${this.modelsUrl}/${id}`;
    this.http.put(url, model, httpOptions).subscribe(data => {
      this.dialogData = model;
      console.log('Successfully update', 3000);
    }, (err: HttpErrorResponse) => {
      console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
  }

  deleteModel(model: Model | string): void {
    const id = typeof model === 'string' ? model : model;
    const url = `${this.modelsUrl}/${id}`;
    this.http.delete(url, httpOptions).subscribe(data => {
      console.log('Successfully deleted', 3000);
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


}
