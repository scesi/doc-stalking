import Row from './Row'
import ItemSchedule from './ItemSchedule'
import HashSchedule from './HashSchedule'

export class Table {
  hoursRow: Array<Row>;
  constructor() {
    this.hoursRow = new Array<Row>()
    for(let hour in HashSchedule) {
      let row = new Row(hour)
      this.hoursRow.push(row)
    }
  }

  clear() {
    this.hoursRow = new Array<Row>()
    for(let hour in HashSchedule) {
      let row = new Row(hour)
      this.hoursRow.push(row)
    }
  }

  insertElement(scheduleItem: ItemSchedule): void {
    let hour: string = scheduleItem.hour
    let positionHour: number = HashSchedule[hour]
    console.log(this.hoursRow[positionHour]);
    this.hoursRow[positionHour].insertElement(scheduleItem)
  }
}

const Schedule = new Table()
export default Schedule