import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
/*
Search
RepoList
  Repository
  Repository
  Repository


topic 
지난주 업데이트
가장 starred
*/
const GITHUB_URL = 'https://api.github.com/search/repositories?q=topic=react+language:javascript&sort=stars&order=desc'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      repos:[],
      language:''
    }

    this.getWeeklyHotRepository = this.getWeeklyHotRepository.bind(this);
  }

  componentWillMount() {
    this.getWeeklyHotRepository();
  }

  getWeeklyHotRepository(){
    const { repos, language } = this.state;

    axios.get(GITHUB_URL)
      .then(response=>this.setState({ repos: response.data.items }))
      .catch(error=> console.log(error));
  }


  render() {
    const { repos } = this.state;
    console.log(repos);
    return (
      <div>
      {repos.map((repo) =>  
        <div className="repository">
          <div className="repo-name">{repo.name}</div>
          <div calssNAme="repo-desc">{repo.description}</div>
        </div>
      )}
      </div>
    )
  }
}
export default App;
