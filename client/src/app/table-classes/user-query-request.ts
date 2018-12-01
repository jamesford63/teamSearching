import {ProfArea} from "./prof-area";

export class UserQueryRequest {
  constructor(public city: string, public profAreas: ProfArea[], public tags: string[], public description: string,
              public name: string) {
  }
}
