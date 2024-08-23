import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SolutionDto} from "../dto/solution-dto";
import {RequestDto} from "../dto/request-dto";

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private baseUrl = 'http://localhost:8081/solution-service/api/solutions';

  constructor(private http: HttpClient) { }

  getAllSolutions(): Observable<SolutionDto[]> {
    return this.http.get<SolutionDto[]>(`${this.baseUrl}/all`);
  }
  getAllSolutionsForUser(): Observable<SolutionDto[]> {
    return this.http.get<SolutionDto[]>(this.baseUrl);
  }

  souscrire(requestData:RequestDto) {
    return this.http.post<any>('http://localhost:8081/solution-service/api/requests/souscrire', requestData);

  }
  getSolutionForUser(id:number):Observable<SolutionDto>{
    return this.http.get<SolutionDto>(`${this.baseUrl}/forUser/${id}`)
  }
getSolution(id:number):Observable<SolutionDto>{
    return this.http.get<SolutionDto>(`${this.baseUrl}/${id}`)
  }


}
