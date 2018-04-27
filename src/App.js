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
const BASE_URL = 'https://api.github.com/search';
const QUERY_REPOSITORY = '/repositories'
const QUERY_TOPIC = '/topics'
const QUERY_ISFEATURED = '?q=is:featured+is:curated+repositories:>1000';
const QUERY_LANGUAGE='?q=language:';
const DEFAULT_LANGUAGE='javascript';
const QUERY_CONDITION='&sort=stars&order=desc';
const QUERY_PAGE =  '&page=';
const QUERY_PP = '&per_page=10';

const TopicList = ({topics})=>
  <div className="topicList">
    {topics.map((topic)=> <Topic key={topic.name} topic={topic}></Topic> )}
  </div>

const Topic = ({topic})=>
  <div className="p-4 topic">
    <a href={topic.html_url} target="_blank">
      <div>
        <h1 className="topic-name mb-2">{topic.display_name}</h1> 
      </div>
      <div className="topic-desc">{topic.short_description}</div>
    </a>
  </div>

const Repository = ({repo}) => 
  <div className="p-4 repository">
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

const RepositoryList = ({repos}) => 
  <div className="repositoryList">
    {repos.map((repo) => <Repository key={repo.id}  repo={repo}></Repository> )}
  </div>

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      repos:[],
      language:DEFAULT_LANGUAGE,
      page:1,
      topics:[],
    }

    this.getHotRepository = this.getHotRepository.bind(this);
    this.onLoadClick = this.onLoadClick.bind(this);
    this.getTopics = this.getTopics.bind(this);
  }

  componentWillMount() {
    this.getTopics();
    this.getHotRepository(this.state.page);
  }

  getTopics(){
    const { page } = this.state;
    const TOPICS_URL = `${BASE_URL}${QUERY_TOPIC}${QUERY_ISFEATURED}${QUERY_PAGE}`;
    axios({
      url: TOPICS_URL,
      method: 'get',
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }})
      .then(response=>{
        console.log(response.data.items);
        this.setState({topics: response.data.items})
      })
      .catch(error=>console.log(error));
  }

  getHotRepository(page){
    const { repos, language } = this.state;
    const GITHUB_URL = `${BASE_URL}${QUERY_REPOSITORY}${QUERY_LANGUAGE}${language}${QUERY_CONDITION}${QUERY_PAGE}${page}${QUERY_PP}`;

    
    axios.get(GITHUB_URL)
      .then(response=>{
        this.setState((prevState)=>{ return { repos: [...prevState.repos, ...response.data.items]}})
      })
      .catch(error=> console.log(error));
  }
  onLoadClick(){
    const { page } = this.state;
    this.setState({ page: page+1 })
    this.getHotRepository(page+1);  
  }
  
  render() {
    const { repos, page, topics } = this.state;
    return (
      <div className="App container">
        <div className="col-md-4">
          {
            topics.length !== 0 &&
            <TopicList topics={topics}></TopicList>
          }
        </div>
        <div className="col-md-8">
          {
            repos.length !== 0 &&
            <RepositoryList repos={repos}></RepositoryList>
          }
          
          <button onClick={this.onLoadClick}>Load more</button>
        </div>
      </div>
    )
  }
}
export default App;
