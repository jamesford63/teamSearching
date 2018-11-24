import {ProfArea} from "./prof-area";
import {User} from "./user";

export class Project {
  constructor(public id: string, public name: string, public profArea: ProfArea[], public participants: User[],
              public owner: User, public tags: string[], public description: string, public requests: User[]) {
  }
}
