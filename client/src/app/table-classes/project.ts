import {ProfArea} from "./prof-area";
import {User} from "./user";
import {ProjectStatus} from "./project-status";
import {Tag} from "./tag";

export class Project {
  constructor(public id: string, public name: string, public profArea: ProfArea[], public participants: User[],
              public owner: User, public tags: Tag[], public description: string,
              public projectStatus: ProjectStatus) {
  }

  getAllProfAreas(){
    let profAreas = "";
    for(var i = 0; i < this.profArea.length; i++){
      profAreas = profAreas + this.profArea[i].name;
    }
    return profAreas.toString;
  }

  public getAllTags(){
    let tags = "";
    for(var i = 0; i < this.tags.length; i++){
      tags = tags + this.tags[i].name;
    }
    return tags.toString;
  }
}
