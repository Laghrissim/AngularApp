import {Project} from "./project";

export interface Message {
  id?: number;
  project?: Project; // Assuming you have a Project model as well
  sender: string;
  content: string;
  timestamp?: Date;
  readDate?: Date;
}
