import React from 'react';
import './index.css';

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


export default Repository;
