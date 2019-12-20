import React, { Component } from 'react'
import './App.css'
import TableView from './Componets/Table'
import Schedule from './Class/Table'
import ItemSchedule, { scheduleConverter } from './Class/ItemSchedule'
import { ListadoDedocentes, materiasQueDa, changeUrl } from './Services/Service'
import AutoComplete from './Componets/autoComplete'
import SelectCareer from './Componets/SelectCareer.screen';
import { Button, InputLabel } from '@material-ui/core'

class App extends Component {
  state = {
    schedule: Schedule,
    listaDocentes: [],
    career: ''
  }

  async componentDidMount() {
    const listaDocentes: any = await ListadoDedocentes()
    console.log(listaDocentes)
    this.setState({listaDocentes});
    this.getTeachers()
    // this.insertData('BLANCO COCA LETICIA')
  }

  async getTeachers () {
    const listaDocentes: Set<String> = await ListadoDedocentes()
    const resp: any[] = [];
    listaDocentes.forEach((ItemSchedule) => {
      resp.push({label: ItemSchedule, value: ItemSchedule});
    })
    this.setState({listaDocentes: resp});
  }

  async insertData(name: string) {
    let matters = (await materiasQueDa(name)).materias
    Schedule.clear()
    let itemsToInsert: ItemSchedule[] = matters
      .map((matter: any) =>
          matter.horarios.map((item: any) =>
            scheduleConverter(matter.materia, 'red', item.duration, item.day, item.start, item.end, item.room)
          )
      )
      .reduce((total, items) => [...total, ...items])
    for (let item of itemsToInsert) {
        Schedule.insertElement(item)
    }
    this.setState({ schedule: Schedule })
  }

  changeCarrer = (career: string) => {
    this.setState({career})
    changeUrl(career)
  }

  render() {
    const {career} = this.state;
    if (!career) {
      return <div className="App">
        <SelectCareer setCareer={(career) => { this.changeCarrer(career) }} />
      </div>
    }
    return (
      <div className="App">

        <Button style={{margin: 10}} variant="contained" onClick={() => { this.changeCarrer('') }} >Volver</Button>
        <AutoComplete
          changeTeacher={(value) => {
            this.insertData(value.value)
          }}
        />
        <InputLabel style={{marginTop: 5}} id="label">Nombre del docente</InputLabel>
        <div style={{marginTop: 20}}>
          <TableView schedule={Schedule} />
        </div>
      </div>
    )
  }
}

export default App
