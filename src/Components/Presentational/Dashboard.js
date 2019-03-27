import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Dashboard = ({ reports, assignments, articles, isAdmin }) => {
  return (
    <Wrapper>
        <List>
          <span>Articles:</span>
          <ul>
            {articles.map((article) => (
              <li key={article.key}>
                <Link to={`articles/${article.key}`}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
          {isAdmin
          ?
            <Button>
              <Link to='newArticle'>
                Add new article
              </Link>
            </Button>
          : null}
        </List>
        <List>
          <span>Assignments:</span>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.key}>
                <Link to={`assignments/${assignment.key}`}>
                  {assignment.title}
                </Link>
              </li>
            ))}
          </ul>
          {isAdmin
            ?
            <Button>
              <Link to='newAssignment'>
                Add new assignment
              </Link>
            </Button>
            : null}
        </List>
        <List>
          <span>Reports:</span>
          <ul>
            {reports.map((report) => (
              <li key={report.key}>
                <Link to={`reports/${report.key}`}>
                  {report.title}
                </Link>
              </li>
            ))}
          </ul>
          {isAdmin
            ?
            <Button>
              <Link to='newReport'>
                Add new report
              </Link>
            </Button>
            : null}
        </List>
      </Wrapper>
  );
};

const List = styled.section`
  span {
    font-size: 1.2rem;
    
    @media (max-width: 650px) {
      font-size: 1.5rem;
      font-weight: bolder;
    }
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    
    @media (max-width: 650px) {
      padding: 0 10px;
    }
  }
  
  li {
    margin: 5px 0;
  }
  
  a {
    display: inline;
    text-decoration: none;
    color: white;
    @media (max-width: 650px) {
      font-size: 1rem;
    }
    
    &:hover {
      border-bottom: 1px dashed lightgray;
    }
  }
`;

const Button = styled.button`
  min-height: 2rem;
  margin: 1rem;
  padding: 0 2rem;
  border: none;
  border-radius: 3px;
  
  a {
    color: black;
  }
`;

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
  }
`;

export default Dashboard;
