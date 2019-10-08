import React from 'react'
import Select from 'react-select'
import { ListadoDedocentes } from '../Services/Service'

const options: any = []

export default class AutoComplete extends React.Component {
    state = {
        selectedOption: null
    }
    handleChange = (selectedOption: any) => {
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption))
    }
    async componentWillMount() {
        console.log(options[0])
        const listaDocentes: any = await ListadoDedocentes()
        listaDocentes.forEach((element: any) => {
            options.push(new ob(element))
        })
        console.log(options)
    }
    render() {
        const { selectedOption } = this.state

        return <Select value={selectedOption} onChange={this.handleChange} options={options} />
    }
}

class ob {
    value: string = ''
    label: string = ''
    constructor(value: string) {
        this.value = this.label = value
    }
}
