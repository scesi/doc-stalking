import React, { Component } from 'react';
import {Table} from '../Class/Table'
import Row from '../Class/Row'
import Box from './Box'

type TableProps = {
  schedule: Table
}

class TableView extends Component<TableProps> {
  renderRow (row: Row) {
    return (
      <tr>
        {row.HourSchedule.map(item => <Box {...item} />)}
      </tr>
    )
  }

  render() {
    let rows = this.props.schedule.hoursRow
    return (
      <table style={{borderWidth: 1}}>
        <tr>
          <th>/</th>
          <th>Lunes</th>
          <th>Martes</th> 
          <th>Miercoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
          <th>Sabado</th>
        </tr>
        {rows.map(row => this.renderRow(row))}
      </table>
    );
  }
}

export default TableView;
