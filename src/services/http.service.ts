import {HttpClient} from "@angular/common/http";

export class HttpService {

  constructor(private http : HttpClient, private url : string) {
  }

  public async get<T>(endpoint : string, args : {key: string, value: string}[] = []) {
    endpoint = this.getEndpointWithArguments(endpoint, args);
    return this.http.get<T>(this.url + endpoint);
  }

  public async post<T>(endpoint : string, body : T) {
    return this.http.post<T>(this.url + endpoint, body);
  }

  public postWithReturnType<T, R>(endpoint : string, body : T) {
    return this.http.post<R>(this.url + endpoint, body);
  }

  public async put<T>(endpoint : string, body : T) {
    return this.http.put<T>(this.url + endpoint, body);
  }

  public async delete<T>(endpoint : string) {
    return this.http.delete<T>(this.url + endpoint);
  }

  public getEndpointWithArguments(endpoint : string, args : {key: string, value: string}[]) : string {
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
