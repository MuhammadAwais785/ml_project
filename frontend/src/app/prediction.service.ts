import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface PredictionResponse { prediction: number | string | null; probabilities?:number[]|null; task:string;mode:'demo'|'real';disclaimer:string;threshold?:number }
@Injectable({providedIn:'root'})
export class PredictionService {
  private http=inject(HttpClient);
  predict(payload:Record<string,string|number>):Observable<PredictionResponse> { return this.http.post<PredictionResponse>('/api/predict',payload); }
}
