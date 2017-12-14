export class ReparationLumiere {
  constructor(public reparationLumiereId: number, public  heure: any, public terrain: Terrain) {
  }
}

export class Terrain {
  constructor(public terrainId: number, public type:number) {

  }
}

export class ChangementPelouse {
  constructor(public changementPelouseId: number, public journee: any, public terrain: Terrain) {
  }
}

export class Client {
  constructor(public clientId: string, public name: string, public blackList: boolean) {
  }
}

export class Reservation {
  constructor(public reservationId: number, public client: Client, public terrain: Terrain, public date: DateSpring,
              public valide: boolean) {
  }
}

export class Abonnement {
  constructor(public abonnementId: number, public client: Client, public start: Date, public end: Date, public duree: number,
              public seance: Seance, public type: number) {
  }
}

export class Seance{
  constructor(public seanceId:number,public jour:string, public heure:Date){}
}

export class DateSpring{
  constructor(public dayOfMonth: number,public dayOfWeek: string,public dayOfYear: number,
              public hour: number,public minute: number, month: string, public monthValue:number,
              public year: number){}
}
export class User{
  constructor(public userName:string, public password:string, public authority:string,public enabled:boolean){}
}
