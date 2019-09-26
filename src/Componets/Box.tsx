import React, { Component } from 'react';
import ItemSchedule from '../Class/ItemSchedule'

export default function Box({color, name}: ItemSchedule) {
  return (
    <td style={{backgroundColor: color}}>{name}</td>
  )
}
