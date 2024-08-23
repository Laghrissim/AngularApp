import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactDto} from "../dto/contact-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8081/auth-service/api/contacts/all';

  constructor(private http: HttpClient) { }
  getAllContacts(): Observable<ContactDto[]> {
    return this.http.get<ContactDto[]>(this.apiUrl);
  }
}
