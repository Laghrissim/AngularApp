import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from "../services/user.service";
import {Utilisateur} from "../model/utilisateur.model";
import {catchError, forkJoin, map, Observable, of} from "rxjs";
import {Project} from "../model/project";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  constructor(private userService: UserService) {}

  transform(array: any[], field: string, order: string = 'asc'): Observable<any[]> {
    if (!array || !field) {
      return of(array);
    }

    return forkJoin(
      array.map(item => this.getFieldValue(item, field))
    ).pipe(
      map(fieldValues => {
        array.sort((a: any, b: any) => {
          const aValue = fieldValues[array.indexOf(a)]; // Get the corresponding field value for each item
          const bValue = fieldValues[array.indexOf(b)];

          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          } else {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
          }
        });
        return array;
      }),
      catchError(error => {
        console.error('Error sorting array:', error);
        return of(array); // Return the original array in case of errors
      })
    );
  }

  private getFieldValue(object: any, field: string): Observable<any> {
    if (field === 'manager_name' && object.manager_id != null) {
      return this.userService.getUserById(object.manager_id).pipe(
        map(manager => manager ? manager.username : '')
      );
    } else {
      return of(object[field]);
    }
  }
}
