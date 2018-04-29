import React from 'react';
import './index.css';

const Topic = ({topic, onClick})=>
  <div className="p-4 topic">
    <a href='#' onClick={()=>onClick(topic.name)}>
      <div>
        <h3 className="topic-name mb-2">{topic.display_name}</h3> 
      </div>
      <div className="topic-description">{topic.short_description}</div>
    </a>
  </div>

export default Topic;
