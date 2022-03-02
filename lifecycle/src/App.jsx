import React from 'react';
import SubComponent from './SubComponent';

class App extends React.Component {


  render() {
    return (
      <div>
        <div>
          Unchanging part
        </div>
        <div>
          <div>
            Changing part
        </div>
          <SubComponent />
        </div>
      </div>
    );
  }
}

export default App;
