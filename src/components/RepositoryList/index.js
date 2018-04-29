import React from 'react';
import Repository from '../Repository'
import './index.css';

const RepositoryList = ({repos}) => 
  <div>
    {repos.map((repo) => <Repository key={repo.id}  repo={repo}></Repository> )}
  </div>

  export default RepositoryList;