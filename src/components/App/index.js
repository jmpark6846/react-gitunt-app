import React, {Component} from 'react';
import axios from 'axios';
import TopicList from '../TopicList';
import RepositoryList from '../RepositoryList';
import Button from '../Button';
import { 
  BASE_URL, 
  QUERY_REPOSITORY,
  QUERY_TOPIC,
  QUERY_ISFEATURED,
  QUERY_BY_TOPIC,
  QUERY_CONDITION,
  QUERY_PAGE,
  QUERY_PP,
  QUERY_PP_DIGIT,
} from '../../constants/'
import './index.css';
const ButtonWithLoading = ({isLoading, onClick, children})=>{ 
  return (
    !isLoading ?                    
    <Button onClick={onClick}>{children}</Button>
    :
    <span>Loading...</span>
  )}
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      repos:[],
      topics:[],
      topic:'',
      topicPage:1,
      repoPage:1,
      isTopicLoading:false,
      isRepoLoading:false,
    }

    this.getHotRepository = this.getHotRepository.bind(this);
    this.onRepositoryLoadClick = this.onRepositoryLoadClick.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.onTopicLoadClick = this.onTopicLoadClick.bind(this);
    this.onTopicClick = this.onTopicClick.bind(this);
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics(topicPage){
    const TOPICS_URL = `${BASE_URL}${QUERY_TOPIC}${QUERY_ISFEATURED}${QUERY_PAGE}${topicPage}${QUERY_PP}${QUERY_PP_DIGIT}`;
    axios({
      url: TOPICS_URL,
      method: 'get',
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }})
      .then(response=>{
        this.setState((prevState)=> { return { topics: [...prevState.topics, ...response.data.items], isTopicLoading: false}})
      })
      .catch(error=>console.log(error)); // TODO : 사용 한도 초과시 403 에러 발생. 에러 처리 추가 필요.
    // this.setState( { topics: topicsData });
  }

  getHotRepository(topic, repoPage){
    const REPOSITORY_QUERY_URL = `${BASE_URL}${QUERY_REPOSITORY}${QUERY_BY_TOPIC}${topic}${QUERY_CONDITION}${QUERY_PAGE}${repoPage}${QUERY_PP}${QUERY_PP_DIGIT}`

    axios.get(REPOSITORY_QUERY_URL)
      .then(response=>{
        this.setState((prevState)=>{ return { repos: [...prevState.repos, ...response.data.items], isRepoLoading: false}})
      })
      .catch(error=> console.log(error));
  }

  onRepositoryLoadClick(){
    const { repoPage, topic } = this.state;
    this.setState({ repoPage: repoPage+1, isRepoLoading : true })
    this.getHotRepository(topic, repoPage+1);  
  }

  onTopicLoadClick(){
    const { topicPage } = this.state;
    this.setState({ topicPage : topicPage+1, isTopicLoading: true });
    this.getTopics( topicPage+1 );
  }

  onTopicClick(topicName){
    // TODO : 토픽 한번에 여러번 클릭시 비동기 응답들로 인해 같은 결과가 여러번 추가될 수 있음. async await 구문 추가로 막기.
    
    // 토픽을 누르면 항상 해당 토픽의 레포지터리 첫페이지를 들고온다.
    this.setState({topic:topicName, repoPage:1, repos:[]});
    this.getHotRepository(topicName, 1);
  }

  render() {
    const { repos, topics, isTopicLoading, isRepoLoading } = this.state;
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-md-3 topic-list">
            { // TODO : 버튼 로딩 부분을 컴포넌트로 리팩토링
              topics.length !== 0 &&
              <div>
                <TopicList 
                  topics={topics}
                  onTopicClick={this.onTopicClick}
                ></TopicList>
                <div className="my-2">
                  { !isTopicLoading ?
                    <Button onClick={this.onTopicLoadClick}>Load</Button> 
                    :
                    <span >Loading...</span>
                  }
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
                    { !isRepoLoading ?                    
                        <Button onClick={this.onRepositoryLoadClick}>Load</Button>
                      :
                        <span >Loading...</span>
                    }
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
