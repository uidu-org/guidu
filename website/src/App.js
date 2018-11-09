import React, { Component } from 'react';
import { Checkbox } from '@uidu/checkbox';
import { Form, FormSubmit } from '@uidu/form';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Guidu <code>src/App.js</code> and save to reload.
          </p>
          <Form
            handleSubmit={() => {}}
            footerRenderer={({ canSubmit }) => (
              <FormSubmit canSubmit={canSubmit} />
            )}
          >
            <Checkbox layout="elementOnly" name="test" label="test" />
          </Form>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
