import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {getCareers} from '../Services/Service';
import Divider from '@material-ui/core/Divider';

type Props = {
  setCareer: (value: string) => void
};
type State = {
  careers: any[]
};

class SelectCareer extends Component<Props, State> {
  state: State = {
    careers: []
  }

  componentDidMount () {
    this.getCareears();
  }

  getCareears = async () => {
    const careers: any = await getCareers();
    this.setState({careers: careers.data});
  }

  render() {
    return (
      <div>
        <h1>Seleccione una carrera</h1>
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.careers.map(career => <div>
            <Divider />
            <ListItem>
              <ListItemText primary={career.name} onClick={() => {this.props.setCareer(career.code)}} />
            </ListItem>
          </div>)}
        </List>
      </div>
    );
  }
}

export default SelectCareer;
