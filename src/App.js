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
const BASE_URL = 'https://api.github.com/search/repositories';
const QUERY_LANGUAGE='?q=language:';
const DEFAULT_LANGUAGE='javascript';
const QUERY_CONDITION='&sort=stars&order=desc';
const QUERY_PAGE =  '&page=';
const QUERY_PP = '&per_page=15';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      repos:[],
      language:DEFAULT_LANGUAGE,
      page:1
    }

    this.getHotRepository = this.getHotRepository.bind(this);
  }

  componentWillMount() {
    this.getHotRepository(this.state.page);
  }

  getHotRepository(page){
    const { repos, language } = this.state;
    const GITHUB_URL = `${BASE_URL}${QUERY_LANGUAGE}${language}${QUERY_CONDITION}${QUERY_PAGE}${page}${QUERY_PP}`;


    axios.get(GITHUB_URL)
      .then(response=>{
        this.setState((prevState)=>{ return { repos: [...prevState.repos, ...response.data.items]}})
      })
      .catch(error=> console.log(error));
  }

  render() {
    const { repos, page } = this.state;
    console.log(repos);
    return (
      <div className="App">
        <div className="repositoryList">
        {repos.map((repo) =>  
          <div key={repo.id} className="p-4 repository">
            <a href={repo.html_url} target="_blank">
              <div>
                <h1 className="repo-name mb-2">{repo.name}</h1>
                <span className="repo-owner ml-2">{repo.owner.login}</span>
                <div className="float-right mt-3">
                  <span><i className="fas fa-star"></i> {repo.stargazers_count}</span>
                  <span className="ml-3"><i className="fas fa-code-branch"></i> {repo.forks_count}</span>
                </div>
              </div>
              <div className="repo-desc">{repo.description}</div>
            </a>
          </div>
        )}
        </div>
        <button onClick={()=>this.getHotRepository(page+1)}>Load more</button>
      </div>
    )
  }
}
export default App;
