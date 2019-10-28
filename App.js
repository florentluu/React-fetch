import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import DisplayEmployee from './components/DisplayEmployee';

const sampleEmployee = {
  gender: 'male',
  name: {
    first: 'Charlie',
    last: 'Thompson'
  },
  location: {
    street: {
      name: 'Tay Street'
    },
    city: 'Timaru',
    postcode: 76111
  },
  email: 'charlie.thompson@example.com',
  picture: {
    medium: 'https://randomuser.me/api/portraits/med/men/40.jpg'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null
    };
    this.getEmployee = this.getEmployee.bind(this);
  }

  componentDidMount() {
    this.getEmployee();
  }

  getEmployee() {
    // Send the request
    axios
      .get('https://randomuser.me/api?nat=fr')
      // Extract the DATA from the received response
      .then(response => response.data)
      // Use this data to update the state
      .then(data => {
        this.setState({
          employee: data.results[0]
        });
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.employee ? (
        <DisplayEmployee employee={this.state.employee} />
        ) : (
          <p>Loading...</p>
        )}
        <button type="button" onClick={this.getEmployee}>
          Get employee
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
export default App;