export class RequestDto {
  description?: string;
  etat?: string = "NON_VALIDE";
  service?: string;
  date_validation?: string;
  date_creation?: string;
  solution_id!:number;
}
