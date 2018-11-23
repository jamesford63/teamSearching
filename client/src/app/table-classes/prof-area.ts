import {Tag} from "./tag";

export class ProfArea {
  constructor(public id: string, public name: string, public relatedTags: Tag[]) {
  }
}
