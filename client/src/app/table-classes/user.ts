
import {ProfArea} from "./prof-area";
import {Project} from "./project";

export class User {
  constructor(public id: string, public login: string, public password: string, public email: string,
              public name: string, public lastName: string, public city: string, public profAreas: ProfArea[],
              public tags: string[], public projectsCreated: Project[], public projectsParticipated: Project[],
              public userStatus: number, public description: string) {
  }
}
