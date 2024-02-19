import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

  static colors = {
    green: "#6aa84f",
    yellow: "#f1c232",
    red: "#cc4125",
    gray: "#808080",
    blue: "#2e78d6",
  };

  events = [
    {
      id: 1,
      text: "Event 1",
      description:"evento1",
      start: DayPilot.Date.today().firstDayOfWeek().addHours(10),
      end: DayPilot.Date.today().firstDayOfWeek().addHours(13),
      backColor: DataService.colors.blue,

      participants: 2,
    },
    {
      id: 2,
      text: "Event 2",
      description:"evento2",
      start: DayPilot.Date.today().firstDayOfWeek().addDays(1).addHours(12),
      end: DayPilot.Date.today().firstDayOfWeek().addDays(1).addHours(15),
      backColor: DataService.colors.green,
      participants: 1,
    },
    {
      id: 3,
      text: "Event 3",
      description:"evento31",
      start: DayPilot.Date.today().firstDayOfWeek().addDays(2).addHours(13),
      end: DayPilot.Date.today().firstDayOfWeek().addDays(2).addHours(16),
      backColor: DataService.colors.yellow,
      participants: 3,
    },
    {
      id: 4,
      text: "Event 4",
      description:"evento4",
      start: DayPilot.Date.today().firstDayOfWeek().addDays(3).addHours(11),
      end: DayPilot.Date.today().firstDayOfWeek().addDays(3).addHours(15),
      backColor: DataService.colors.red,
      participants: 4,
    },
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

  }

  getColors(): any[] {
      const colors = [
        {name: "Completa", id: DataService.colors.green},
        {name: "Alerta", id: DataService.colors.yellow},
        {name: "Cancelada", id: DataService.colors.red},
        {name: "En proceso", id: DataService.colors.gray},
        {name: "Agendada", id: DataService.colors.blue},
      ];
      return colors;
  }

}
