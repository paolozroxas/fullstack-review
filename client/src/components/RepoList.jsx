import React from 'react';
import _ from 'underscore';

const RepoList = (props) => {
  if (!props.repos || props.repos.length === 0) {
    return (<h2>Loading...</h2>);
  } else {
    return (
      <div className="flex-col">
        <h2> Top Repos</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Owner</th>
              <th>Name</th>
              <th>Description</th>
              <th>Stars</th>
            </tr>
            {
              _.map(props.repos, (repo, index) => {
                return (
                    <Repo repo={repo} identifier={index} key={index} />
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
};

const Repo = (props) => (
  <tr className="repo">
    <td> <img className="avatar" src={props.repo.ownerAvatarUrl} /> </td>
    <td> <a href={props.repo.ownerProfileUrl}>{props.repo.owner}</a> </td>
    <td> <a href={props.repo.url}>{props.repo.name}</a> </td>
    <td className="description">{props.repo.description}</td>
    <td>{props.repo.stars ? props.repo.stars + '★' : ''}</td>
  </tr>
);




export default RepoList;
