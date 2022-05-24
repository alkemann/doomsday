import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  public randomDates(n:number, startYear:number, endYear:number) {
    const min = new Date(startYear, 0, 1).getTime();
    const max =   new Date(endYear, 11, 31, 23, 59, 59).getTime();
    let dates = [];
    for (let index = 0; index < n; index++) {
      const rn = Math.floor(Math.random() * (max - min + 1) + min)
      dates[index] = new Date(rn);

    }
    return dates;
  }

}
