import ItemSchedule from './ItemSchedule'
import HashDays from './HashDays'

export default class Row {
  HourSchedule: Array<ItemSchedule>;
  constructor(hourRate: string, day: string = '/')  {
    this.HourSchedule = new Array<ItemSchedule>(7);
    this.HourSchedule[0] = new ItemSchedule(hourRate, '', '/', hourRate)
    for (let i=1; i<8; i++) {
      this.HourSchedule[i] = new ItemSchedule('', '', '', '')
    }
  }

  insertElement(scheduleItem: ItemSchedule): void {
    let day: string = scheduleItem.day
    let positionDay: number = HashDays[day]
    this.HourSchedule[positionDay] = scheduleItem
  }
}