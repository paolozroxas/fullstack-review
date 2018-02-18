import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

var server = 'http://localhost:1128/repos';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      loading: false
    }
    this.fetch();
  }

  componentDidMount() {

  }

  fetch() {
    $.ajax({
      url: server,
      method: 'GET',
    })
    .done((data) => {
      this.setState({repos: data});
      console.log('fetch GET response:', this.state.repos);
    })
  }

  search (term) {
    this.setState({loading: true});
    $.ajax({
      url: server,
      method: 'POST',
      data: JSON.stringify({username: term}),
      contentType: 'application/json'
    })
    .done(data => {
      console.log('search POST response:', data);
      this.fetch();
      this.setState({loading: false});
    })

  }

  render () {
    return (<div className="flex-col">
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} loading={this.state.loading}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
