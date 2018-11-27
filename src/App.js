import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {

      initialItems: [],
      items: []
    };
    this.filterList = this.filterList.bind(this)
  }
  componentWillMount() {
    fetch('https://api.github.com/search/repositories?q=topic:ruby+topic:rails')
        .then(res => res.json())
        .then(
            data => {
              this.setState({
                items: data.items,
                initialItems: data.items
              });
            });

    this.setState({items: this.state.initialItems})
  }

  filterList(event) {
    var updatedList = this.state.initialItems;

    updatedList = updatedList.filter(function (item) {
      return ((item.name.toLowerCase().search(
              event.target.value.toLowerCase()) !== -1)
      );
    });
    this.setState({items: updatedList});
  }

  render() {
    return (
        <div className="container">

          <input type="text" placeholder="Search" onChange={this.filterList}  className="form"/>
          <table className="table-filter">
            <thead>
            <tr>
              <th>name</th>
              <th>full_name</th>
              <th>language</th>
              <th>description</th>
            </tr>
            </thead>
            <tbody>
            {this.state.items
                .sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);})
                .map((listValue, index) => {
                  return (
                      <tr key={index}>
                        <td>{listValue.name}</td>
                        <td>{listValue.full_name}</td>
                        <td>{listValue.language}</td>
                        <td>{listValue.description}</td>
                      </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
    );
  }
}

export default App;
