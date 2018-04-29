import React from 'react';
import Topic from '../Topic';
import './index.css';

const TopicList = ({topics, onTopicClick})=>
  <div>
    {topics.map((topic)=> 
      <Topic 
        key={topic.name} 
        topic={topic}
        onClick={onTopicClick}
      ></Topic> )}
  </div>

  export default TopicList;
