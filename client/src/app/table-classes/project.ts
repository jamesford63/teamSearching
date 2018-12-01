import {ProfArea} from "./prof-area";
import {User} from "./user";
import {ProjectStatus} from "./project-status";

export class Project {
  constructor(public id: string, public name: string, public profArea: ProfArea[], public participants: User[],
              public owner: User, public tags: string[], public description: string,
              public projectStatus: ProjectStatus) {
  }

  public getAllProfAreas(){
    let profAreas = "";
    for(var i = 0; i < this.profArea.length; i++){
      profAreas = profAreas + this.profArea[i].name;
    }
    return profAreas;
  }
}
