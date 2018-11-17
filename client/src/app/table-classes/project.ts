import {ProfArea} from "./prof-area";
import {User} from "./user";
import {Tag} from "./tag";

export class Project {
  constructor(public id: string, public name: string, public profArea: ProfArea, public participants: User[],
              public owner: User, public tags: Tag[], public description: string) {
  }
}
