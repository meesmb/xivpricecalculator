import {HttpClient} from "@angular/common/http";
import {lastValueFrom, of} from "rxjs";

export class HttpService {

  constructor(private http : HttpClient, private url : string) {
  }

  protected async _get<T>(endpoint : string, args : {key: string, value: string}[] = []) : Promise<T> {
    endpoint = this.getEndpointWithArguments(endpoint, args);
    const result = this.http.get<T>(this.url + endpoint);
    return await lastValueFrom(result);
  }

  protected async _post<T>(endpoint : string, body : T) : Promise<T> {
    const result = this.http.post<T>(this.url + endpoint, body);
    return await lastValueFrom(result);
  }

  protected async _postWithReturnType<T, R>(endpoint : string, body : T) : Promise<R> {
    const result = this.http.post<R>(this.url + endpoint, body);
    return await lastValueFrom(result);
  }

  protected async _put<T>(endpoint : string, body : T) : Promise<T> {
    const result = this.http.put<T>(this.url + endpoint, body);
    return await lastValueFrom(result);
  }

  protected async _delete<T>(endpoint : string) : Promise<T> {
    const result = this.http.delete<T>(this.url + endpoint);
    return await lastValueFrom(result);
  }

  private getEndpointWithArguments(endpoint : string, args : {key: string, value: string}[]) : string {
    if (args.length !== 0) {
      endpoint += "?";
      args.forEach(({key, value}) => {
        endpoint += key + "=" + value + "&";
      });
      endpoint = endpoint.substr(0, endpoint.length - 1);
    }
    return endpoint;
  }
}
