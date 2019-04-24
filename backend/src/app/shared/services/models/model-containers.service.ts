import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Model } from './model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class ModelContainersService {

  private modelContainersFirstUploadUrl = environment.API_ENDPOINT + 'containers/first_image/upload';
  private modelContainersSecondUploadUrl = environment.API_ENDPOINT + 'containers/second_image/upload';

  private modelContainersDeleteUrl = environment.API_ENDPOINT + 'containers/cars/files/';

  constructor(private http: HttpClient) { }

  uploadFirstFile(formdata1: any) {
    return this.http.post(this.modelContainersFirstUploadUrl, formdata1);
  }

  uploadSecondFile(formdata2: any) {
    return this.http.post(this.modelContainersSecondUploadUrl, formdata2);
  }

  deleteFile(file: any | string): Observable<any> {
    const id = typeof file === 'string' ? file : file;
    const url = `${this.modelContainersDeleteUrl}${id}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted file id=${id}`)),
      catchError(this.handleError<any>('deleteFile'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('ContainerService: ' + message);
  }

}
