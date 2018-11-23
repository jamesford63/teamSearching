export class User {
  constructor(public id: string, public login: string, public password: string, public email: string,
              public name: string, public lastName: string, public city: string, public profAreas: number[],
              public projectsCreated: number[], public projectsParticipated: number[],
              public userStatus: number, public description: string) {
  }
}
