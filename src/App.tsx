import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TableView from './Componets/Table'
import Schedule from './Class/Table'
import ItemSchedule, { scheduleConverter } from './Class/ItemSchedule'
import { ListadoDedocentes, materiasQueDa, Materia } from './Services/Service'
import Button from '@material-ui/core/Button'
import AutoComplete from './Componets/autoComplete'

class App extends Component {
    state = {
        schedule: Schedule
    }

    componentDidMount() {
        this.insertData('BLANCO COCA LETICIA')
    }

    async insertData(name: string) {
        let matters = (await materiasQueDa(name)).materias
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
        // console.log(materiasQueDa('BLANCO COCA LETICIA'))
        // console.log(ListadoDedocentes())
        return (
            <div className="App">
                <AutoComplete />
                <Button variant="contained" color="primary">
                    Hola Mundo!
                </Button>
                <TableView schedule={Schedule} />
            </div>
        )
    }
}

export default App
