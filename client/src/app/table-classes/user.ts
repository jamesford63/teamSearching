
import {ProfArea} from "./prof-area";
import {Project} from "./project";
import {Tag} from "./tag";
import {UUID} from "angular2-uuid";

export class User {
  constructor(public id: string, public login: string, public password: string, public email: string,
              public name: string, public lastName: string, public city: string, public profAreas: ProfArea[],
              public tags: Tag[], public projectsCreated: String[], public projectsParticipated: String[],
              public userStatus: number, public description: string) {
  }
}
