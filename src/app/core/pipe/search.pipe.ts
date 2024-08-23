import { Pipe, PipeTransform } from '@angular/core';
import {Project} from "../model/project";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(projects: Project[] | null, searchTerm: string): Project[] | null {
    if (!projects || !searchTerm) {
      return projects || []; // Return empty array if projects is null or searchTerm is empty
    }

    searchTerm = searchTerm.toLowerCase();
    return projects.filter(project =>
      (project.name?.toLowerCase()?.includes(searchTerm) ?? false) ||
      (project.description?.toLowerCase()?.includes(searchTerm) ?? false) ||
      (project.stage?.toLowerCase()?.includes(searchTerm) ?? false)||
      (project.manager_name?.toLowerCase()?.includes(searchTerm) ?? false)
    );
  }


}
