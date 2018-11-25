import {ProfArea} from "./prof-area";

export class ProjectQueryRequest {
  constructor(public name: string, public profAreas: ProfArea[], public tags: string[], public description: string) {
  }
}
