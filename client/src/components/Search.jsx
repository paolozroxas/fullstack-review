import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onKeyUp (e) {
    if(e.key === 'Enter') {
      this.search();
      e.target.value = '';
    }
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="flex-row">
        Enter a github username:
          <input className="search-field" value={this.state.terms} onKeyUp={this.onKeyUp.bind(this)}/>
          <button className="search-btn" onClick={this.search.bind(this)}> Add Repos </button>
        <div className="loading">
          {this.props.loading ? <img className="loading" src="/loading.gif" /> : ''}
        </div>
      </div>
    )
  }
}

export default Search;
