import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TableView from './Componets/Table'
import Schedule from './Class/Table'
import ItemSchedule, { scheduleConverter } from './Class/ItemSchedule'
import { ListadoDedocentes, materiasQueDa, Materia } from './Services/Service'
import Button from '@material-ui/core/Button'
import AutoComplete from './Componets/autoComplete'
import Complete from './Componets/Complete'

class App extends Component {
    state = {
        schedule: Schedule,
        listaDocentes: []
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
        // Schedule.insertElement(itemsToInsert[0]);
        for (let item of itemsToInsert) {
            Schedule.insertElement(item)
        }
        this.setState({ schedule: Schedule })
        // console.log(Schedule)
    }

    render() {
        return (
            <div className="App">
                <AutoComplete />
                <Complete
                  selectedDoc={(value) => {
                    this.insertData(value.value)
                  }}
                  suggestions={this.state.listaDocentes} />
                <Button variant="contained" color="primary">
                    Hola Mundo!
                </Button>
                <TableView schedule={Schedule} />
            </div>
        )
    }
}

export default App
