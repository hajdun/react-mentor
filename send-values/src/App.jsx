import React from 'react';
import SelectLanguage from './SelectLanguage'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      language: "hu"
    }
  }

  // retrieve all customers on a GET http://localhost:3001/customers request
  handleLanguage = (langValue) => {
    this.setState({ language: langValue })
  }


  render() {
    return (
      <div className="App" >
        <SelectLanguage handleLanguage={this.handleLanguage} />
        <div>{this.state.language}</div>
      </div>
    );
  }
}

export default App;
