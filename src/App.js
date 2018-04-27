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
const GITHUB_URL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&page=1&per_page=15'
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
      <div className="App">
      <div className="">
        {repos.map((repo) =>  
          <div key={repo.id} className="p-4 repository">
            <a href={repo.html_url} target="_blank">
              <div>
                <h1 className="repo-name mb-2">{repo.name}</h1>
                <span className="repo-owner ml-2">{repo.owner.login}</span>
                <div className="float-right mt-3">
                  <span><i class="fas fa-star"></i> {repo.stargazers_count}</span>
                  <span className="ml-3"><i class="fas fa-code-branch"></i> {repo.forks_count}</span>
                </div>
              </div>
              <div className="repo-desc">{repo.description}</div>
            </a>
          </div>
        )}
        </div>
      </div>
    )
  }
}
export default App;
