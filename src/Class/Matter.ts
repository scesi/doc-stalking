/*
  Schedule example
  day: "MA"
  duration: 2
  end: "945"
  room: "693B"
  start: "815"
  teacher: "CESPEDES GUIZADA MARIA BENITA"
*/
import ItemSchedule, {scheduleConverter} from './ItemSchedule'

function getGroups (schedules: any[], name: string): ItemSchedule[] {
  return schedules.map(item => scheduleConverter(name, 'white', item.duration, item.day, item.start, item.end, item.room))
}

class Matter {
  code: string;
  schedules: ItemSchedule[];
  teacher: string;
  constructor(code: string, schedules: any[], teacher: string, name: string){
    this.code = code;
    this.teacher = teacher;
    this.schedules = getGroups(schedules, name)
    // this.schedule = schedule;
  }
}

export default Matter