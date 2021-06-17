import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { share, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConstService } from './const.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "";
  constructor(private http: HttpClient, private constt: ConstService) {
    this.url = constt.getBaseUrl;
  }

  appendAccessToken(headers:
    HttpHeaders) {
    const accessToken = localStorage.getItem("token");
    // console.log('token **************** ', accessToken);
    headers = headers.set('Authorization',`Bearer ${accessToken}`);
    return headers;
  }

  addCommonHeaders(headers:HttpHeaders) {
    headers =headers.set('AppVersion','v0.0.1');
    // const user = JSON.parse(localStorage.getItem("currentUser"));
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // console.log('user ****************', user);
    headers = headers.set('__login__',user.login);
    return headers;

  }

  get(endpoint:string, params?:any, reqOpts?:any, secure:boolean = true) {
    if (!reqOpts) {
      reqOpts = {
        params:
          new HttpParams()
      };
    }
    // Support easy query params for GET requests

    if (params) {reqOpts.params =new HttpParams();
      for (const k of Object.keys(params)) {
        reqOpts.params =
          reqOpts.params.set(k,
            params[k]);
      }
    }

    if (secure) {
      reqOpts.headers =this.appendAccessToken(reqOpts.headers || new HttpHeaders());
      console.log('secure options:',reqOpts);
    }

    reqOpts.headers =this.addCommonHeaders(reqOpts.headers ||
        new HttpHeaders());
    // console.log('options************************',
    //   reqOpts);

    return this.http.get(this.url
       + endpoint.replace(/^\/+/,
        ''), reqOpts).pipe(share(),
          catchError(this.handleError));
  }

  post(endpoint:string, body:any, reqOpts?:any, secure:boolean = true) {
    reqOpts =reqOpts || {};
    if (secure) {
      reqOpts.headers =
        this.appendAccessToken(reqOpts.headers ||
          new HttpHeaders());
    }

    reqOpts.headers =
      this.addCommonHeaders(reqOpts.headers || new HttpHeaders());
    return this.http.post(this.url
       + endpoint.replace(/^\/+/,
        ''), body,
      reqOpts).pipe(share(),
        catchError(this.handleError));

  }

  put(endpoint:string, body:any, reqOpts?:any, secure =true) {
    reqOpts = reqOpts || {};
    if (secure) {
      reqOpts.headers =
        this.appendAccessToken(reqOpts.headers || new HttpHeaders());
    }
    reqOpts.headers =
      this.addCommonHeaders(reqOpts.headers || new HttpHeaders());
    return this.http.put(this.url
       + endpoint.replace(/^\/+/,
        ''), body,
      reqOpts).pipe(catchError(this.handleError));

  }

  delete(endpoint:string, reqOpts?:any, secure:boolean = true) {
    reqOpts =reqOpts || {};
    if (secure) {
      reqOpts.headers =
        this.appendAccessToken(reqOpts.headers ||new HttpHeaders());
    }
    reqOpts.headers = this.addCommonHeaders(reqOpts.headers || new HttpHeaders());

    return this.http.delete(this.url
       + endpoint.replace(/^\/+/,
        ''), reqOpts).pipe(share(),
          catchError(this.handleError));
  }

  patch(endpoint:string, body:any, reqOpts?:any, secure:boolean = true) {
    reqOpts = reqOpts || {};
    if (secure) {
      reqOpts.headers = this.appendAccessToken(reqOpts.headers || new HttpHeaders());
    }
    reqOpts.headers =this.addCommonHeaders(reqOpts.headers || new HttpHeaders());

    return this.http.patch(this.url
       + endpoint.replace(/^\/+/,
        ''), body,
      reqOpts).pipe(share(),
        catchError(this.handleError));

  }



  private handleError(error:HttpErrorResponse) {
    console.log('Error',error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:',
        error.error.message);
    } else {
      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status},` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError((error.error && error.error.message) || 'Something bad happened; please try again later.');
  }

}







