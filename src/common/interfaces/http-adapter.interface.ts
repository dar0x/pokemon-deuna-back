import { Observable } from 'rxjs';

export interface HttpAdapter {
  get<T>(url: string): Observable<T>;
}
