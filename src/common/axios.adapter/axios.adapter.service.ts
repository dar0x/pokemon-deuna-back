import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class AxiosAdapterService implements HttpAdapter {
  private axios: AxiosInstance = axios;

  get<T>(url: string): Observable<T> {
    try {
      return from(this.axios.get(url)).pipe(
        map((response) => <T>response.data),
      );
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }
}
