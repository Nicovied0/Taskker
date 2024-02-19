
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent,
} from '@daypilot/daypilot-lite-angular';
import { DataService } from './data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('navigator') nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  form = [
    { name: 'Titulo', id: 'text' },
    { name: 'Descripcion', id: 'description' },
    {
      name: 'Comienza',
      id: 'start',
      dateFormat: 'MM/dd/yyyy',
      type: 'datetime',
    },
    { name: 'Termina', id: 'end', dateFormat: 'MM/dd/yyyy', type: 'datetime' },
    {
      name: 'Estado',
      id: 'backColor',
      type: 'select',
      options: this.ds.getColors(),
    },
  ];

  date = DayPilot.Date.today();

  contextMenu = new DayPilot.Menu({
    items: [
      {
        text: 'Eliminar',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          dp.events.remove(event);
        },
      },
      {
        text: 'Editar',
        onClick: async (args) => {
          const event = args.source;
          const dp = event.calendar;
          console.log(event);
          console.log(dp);
          const data = event.data;

          const form = [
            { name: 'Titulo', id: 'text' },
            { name: 'Descripcion', id: 'description' },
            {
              name: 'Comienza',
              id: 'start',
              dateFormat: 'MM/dd/yyyy',
              type: 'datetime',
            },
            {
              name: 'Termina',
              id: 'end',
              dateFormat: 'MM/dd/yyyy',
              type: 'datetime',
            },
            {
              name: 'Estado',
              id: 'backColor',
              type: 'select',
              options: this.ds.getColors(),
            },
          ];

          const modal = await DayPilot.Modal.form(form, data);

          if (modal.canceled) {
            return;
          }

          event.data.text = modal.result.text;
          event.data.description = modal.result.description;
          event.start = modal.result.start;
          event.end = modal.result.end;
          event.data.backColor = modal.result.backColor;

          dp.events.update(event);
        },
      },
      {
        text: 'Cancelada',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.red;
          dp.events.update(event);
        },
      },
      {
        text: 'Completada',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.green;

          dp.events.update(event);
        },
      },
      {
        text: 'Agendada',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.blue;

          dp.events.update(event);
        },
      },
      {
        text: 'Alerta',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.yellow;

          dp.events.update(event);
        },
      },

      {
        text: 'En proceso',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          event.data.backColor = DataService.colors.gray;

          dp.events.update(event);
        },
      },
    ],
  });

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args) => {
      this.loadEvents();
    },
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
    durationBarVisible: false,
    contextMenu: this.contextMenu,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',
    durationBarVisible: false,
    contextMenu: this.contextMenu,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  configMonth: DayPilot.MonthConfig = {
    contextMenu: this.contextMenu,
    eventBarVisible: false,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  constructor(private ds: DataService) {
    this.viewWeek();
  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe((result) => {
      this.events = result;
    });
  }

  viewDay(): void {
    this.configNavigator.selectMode = 'Day';
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = 'Week';
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = 'Month';
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  onBeforeEventRender(args: any) {
    const dp = args.control;
    args.data.areas = [
      {
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        symbol: 'assets/icons/daypilot.svg#minichevron-down-2',
        fontColor: '#fff',
        toolTip: 'Show context menu',
        action: 'ContextMenu',
      },
      {
        top: 3,
        right: 25,
        width: 20,
        height: 20,
        symbol: 'assets/icons/daypilot.svg#x-circle',
        fontColor: '#fff',
        action: 'None',
        toolTip: 'Delete event',
        onClick: async (args: any) => {
          dp.events.remove(args.source);
        },
      },
    ];
  }

  async onTimeRangeSelected(args: any) {
    console.log('asdasdas');
    const modal = await DayPilot.Modal.prompt(
      'Crear nuevo evento en tu agenda:',
      'Evento'
    );
    const dp = args.control;
    dp.clearSelection();
    if (!modal.result) {
      return;
    }
    dp.events.add(
      new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
      })
    );
  }

  async onEventClick(args: any) {
    const form = [
      { name: 'Titulo', id: 'text' },
      { name: 'Descripcion', id: 'description' },
      {
        name: 'Comienza',
        id: 'start',
        dateFormat: 'MM/dd/yyyy',
        type: 'datetime',
      },
      {
        name: 'Termina',
        id: 'end',
        dateFormat: 'MM/dd/yyyy',
        type: 'datetime',
      },
      {
        name: 'Estado',
        id: 'backColor',
        type: 'select',
        options: this.ds.getColors(),
      },
    ];
    const data = args.e.data;
    console.log(args)

    const modal = await DayPilot.Modal.form(form, data);

    if (modal.canceled) {
      return;
    }
    console.log(args.e.data)
    const dp = args.control;

    dp.events.update(modal.result);
  }
}
