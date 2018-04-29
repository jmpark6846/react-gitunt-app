import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { topicsData } from './constants';

const BASE_URL = 'https://api.github.com/search';
const QUERY_REPOSITORY = '/repositories'
const QUERY_TOPIC = '/topics'
const QUERY_ISFEATURED = '?q=is:featured+is:curated+repositories:>1000';
const QUERY_BY_TOPIC='?q=topic:';
const QUERY_CONDITION='&sort=stars&order=desc';
const QUERY_PAGE =  '&page=';
const QUERY_PP = '&per_page=';
const QUERY_PP_DIGIT = '10';


const TopicList = ({topics, onTopicClick})=>
  <div>
    {topics.map((topic)=> 
      <Topic 
        key={topic.name} 
        topic={topic}
        onClick={onTopicClick}
      ></Topic> )}
  </div>


const Topic = ({topic, onClick})=>
  <div className="p-4 topic">
    <a href='#' onClick={()=>onClick(topic.name)}>
      <div>
        <h3 className="topic-name mb-2">{topic.display_name}</h3> 
      </div>
      <div className="topic-description">{topic.short_description}</div>
    </a>
  </div>
  

const Repository = ({repo}) => 
  <div className="p-3 repository">
    <a href={repo.html_url} target="_blank">
      <div>
        <div>
          <h3 className="repo-name mb-2">{repo.name}</h3>
          <span className="repo-owner ml-2">{repo.owner.login}</span>
        </div>
      </div>
      <div className="repo-desc">{repo.description}</div>
      <div className="repo-info-wrapper">
        <div className="repo-star"><i className="fas fa-star"></i> {repo.stargazers_count}</div>
        <div className="repo-fork"><i className="fas fa-code-branch"></i> {repo.forks_count}</div>
      </div>
    </a>
  </div>


const RepositoryList = ({repos}) => 
  <div>
    {repos.map((repo) => <Repository key={repo.id}  repo={repo}></Repository> )}
  </div>


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      repos:[],
      topics:[],
      topic:'',
      topicPage:1,
      repoPage:1,
      isRepoLoading:false,
    }

    this.getHotRepository = this.getHotRepository.bind(this);
    this.onLoadClick = this.onLoadClick.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.onTopicLoadClick = this.onTopicLoadClick.bind(this);
    this.onTopicClick = this.onTopicClick.bind(this);
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics(topicPage){
    const TOPICS_URL = `${BASE_URL}${QUERY_TOPIC}${QUERY_ISFEATURED}${QUERY_PAGE}${topicPage}`;
    axios({
      url: TOPICS_URL,
      method: 'get',
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }})
      .then(response=>{
        this.setState((prevState)=> { return { topics: [...prevState.topics, ...response.data.items]}})
      })
      .catch(error=>console.log(error)); // TODO : 사용 한도 초과시 403 에러 발생. 에러 처리 추가 필요.
    // this.setState( { topics: topicsData });
  }

  getHotRepository(topic, repoPage){
    const REPOSITORY_QUERY_URL = `${BASE_URL}${QUERY_REPOSITORY}${QUERY_BY_TOPIC}${topic}${QUERY_CONDITION}${QUERY_PAGE}${repoPage}${QUERY_PP}${QUERY_PP_DIGIT}`

    axios.get(REPOSITORY_QUERY_URL)
      .then(response=>{
        this.setState((prevState)=>{ return { repos: [...prevState.repos, ...response.data.items]}})
      })
      .catch(error=> console.log(error));
  }

  onLoadClick(){
    const { repoPage, topic } = this.state;
    this.setState({ repoPage: repoPage+1 })
    this.getHotRepository(topic, repoPage+1);  
  }
  onTopicLoadClick(){
    const { topicPage } = this.state;
    this.setState({ topicPage : topicPage+1 });
    this.getTopics( topicPage+1 );
  }
  
  onTopicClick(topicName){
    const { topic } = this.state;
    // TODO : 토픽 한번에 여러번 클릭시 비동기 응답들로 인해 같은 결과가 여러번 추가될 수 있음. async await 구문 추가로 막기.
    
    // 토픽을 누르면 항상 해당 토픽의 레포지터리 첫페이지를 들고온다.
    this.setState({topic:topicName, repoPage:1, repos:[]});
    this.getHotRepository(topicName, 1);
  }

  render() {
    const { repos, topics, isRepoLoading } = this.state;
    console.log(repos);
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-md-3 topic-list">
            { 
              topics.length !== 0 &&
              <div>
                <TopicList 
                  topics={topics}
                  onTopicClick={this.onTopicClick}
                ></TopicList>
                <div className="my-2">
                  <Button onClick={this.onTopicLoadClick}>Load</Button>
                </div>
              </div>
            }
          </div>
          <div className="col-md-9 repository-list">
            {
              repos.length !== 0 && (
                <div>
                  <RepositoryList repos={repos}></RepositoryList>
                  <div className="my-2">
                    <Button onClick={this.onLoadClick}>Load</Button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
export default App;

const Button = ({onClick, children})=>
  <button 
    className="btn btn-default load-btn" 
    onClick={onClick}>
    {children}
  </button>
