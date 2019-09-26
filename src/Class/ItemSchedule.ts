/*
  Schedule example
  day: "MA"
  duration: 2
  end: "945"
  room: "693B"
  start: "815"
  teacher: "CESPEDES GUIZADA MARIA BENITA"
*/

export function scheduleConverter(name: string, color:string = 'white', duration: number, day: string,
  start: string, end: string, room: string) {
    return new ItemSchedule(`${name} - ${room}`, color, day, `${start}-${end}`)
}

export default class ItemSchedule {
  name: string = '';
  color: string = 'white';
  day: string = '';
  hour: string = '';
  constructor(name: string, color: string, day: string, hour: string) {
    this.name = name;
    this.color = color;
    this.day = day;
    this.hour = hour;
  }
}
