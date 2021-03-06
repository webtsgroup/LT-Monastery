import { Injectable } from '@angular/core';
import { Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

const apiBaseUrl = `${environment.apiBaseUrl}`;

@Injectable()

export class ApiService {

  constructor(
    private authHttp: AuthHttp,
    private auth: AuthService
  ) {}

  /**
   * Perform GET HTTP method
   * @method get
   * @param  {Array<any> | any}     uri     Describe API endpoint by mixed array
   *                                        or a string or single number
   * @param  {RequestOptionsArgs}   options Additional setting for API call
   * @return {Observable<Response>}         Response data and/or error message
   */
  public get(uri: Array<any> | any, options?: RequestOptionsArgs): Observable<Response> {
    let [url, preRequest] = this._constructRequest(uri, options);
    let request = this.authHttp.get(url, preRequest);
    return this._connect(request);
  }

  /**
   * Perform POST HTTP method
   * @method post
   * @param  {Array<any> | any}     uri     Describe API endpoint by mixed array
   *                                        or a string or single number
   * @param  {any}                  body    Data to send, form data and/or file
   * @param  {RequestOptionsArgs}   options Additional setting for API call
   * @return {Observable<Response>}         Response data and/or error message
   */
  public post(uri: Array<any> | any, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let [url, preRequest] = this._constructRequest(uri, options);
    let request = this.authHttp.post(url, body, preRequest);
    return this._connect(request);
  }

  /**
   * Perform PUT HTTP method
   * @method put
   * @param  {Array<any> | any}     uri     Describe API endpoint by mixed array
   *                                        or a string or single number
   * @param  {any}                  body    Data to send, form data and/or file
   * @param  {RequestOptionsArgs}   options Additional setting for API call
   * @return {Observable<Response>}         Response data and/or error message
   */
  public put(uri: Array<any> | any, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let [url, preRequest] = this._constructRequest(uri, options);
    let request = this.authHttp.put(url, body, preRequest);
    return this._connect(request);
  }

  private _constructRequest(uri: Array<any> | any, moreOptions?: RequestOptionsArgs): any {
    let url = Array.prototype.concat(apiBaseUrl, uri).join(String.fromCharCode(47));
    let options: RequestOptions = new RequestOptions();
    if (moreOptions) {
      options = options.merge(moreOptions);
    }

    // Perform authenticated request to internal API
    let preRequest: Request = new Request(options);

    return [url, preRequest];
  }

  private _connect(request: Observable<Response>): Observable<Response> {
    // Collect data and handle errors after request
    return request.map(this._extractData)
                  .catch(err => {
                    // Workaround for unable to get notify defined
                    return this._handleError(err);
                  });
  }

  /**
   * Helper method for returning only data part from responsed request
   * @method _extractData
   * @param  {Response}   res Responsed body
   * @return {any}            Data object, for DELETE method may get empty data
   */
  private _extractData(res: Response) {
    // Data always be returned.
    return res.json();
  }

  /**
   * Helper method for hook up Error handler helper
   * @method _handleError
   * @param  {any}        err Error information from failed request
   */
  private _handleError(err: any) {
    try {
      //token changed
      if (err.status === 401) {
        this.auth.logout();
      }
    } catch (e) {
      // server error - API not responsed
    }

    // Always give back the error for subscriber.
    return Observable.throw(err);
  }

}

/**
 * Export wrapper for `ApiService` and its dependencies
 * @type {any}
 */
export const API_PROVIDERS: any = [
  ApiService
];
