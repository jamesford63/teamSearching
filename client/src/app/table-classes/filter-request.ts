import {ProfArea} from "./prof-area";
import {Tag} from "./tag";

export class FilterRequest {
  constructor(public city: string, public profAreas: ProfArea[], public tags: Tag[], public description: string,
              public name: string) {
  }
}
