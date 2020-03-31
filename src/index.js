import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as API from './socket-api';
import URLSearchParams from 'url-search-params';

import './index.css';

export default class Sum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 0,
      b: 0,
      result: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    API.subscribe(({ result }) => {
      this.setState({
        result: result
      })
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const params = new URLSearchParams();
    params.append('a', this.state.a);
    params.append('b', this.state.b);

    fetch(`${API.API_URL}/api/calc/sum`, { method: 'POST', body: params })
      .then(res => res.json());
  }

  render() {
    const {a,b, result} = this.state;

    const serverResult = result ? (
      <label>
        Result:
        <input type="number" value={this.state.result} name='b' readOnly />
      </label>
    ) : '';
    return (
      <form>
        <label>
          A:
          <input type="number" name='a' onChange={this.handleChange} />
        </label>
        <label>
          B:
          <input type="number" name='b' onChange={this.handleChange} />
        </label>
        {serverResult}
        <br />
        <input disabled={(a === 0 || b === 0) ? true : false} onClick={this.handleSubmit} type="submit" value="Get result" />
      </form>
    );
  }
}

ReactDOM.render(
  <Sum />,
  document.getElementById("mainReact")
);