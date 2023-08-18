//this file is related to the charts we want to draw on the dashboard (homepage)
import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"; //these are the components under the Charts component folder

const Repos = () => {
  const { repos } = React.useContext(GithubContext); 
  //**Add real data
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item; //destructure the language (for pie chart) and stargazers_count (for doughnut chart)
    //remove language:null--since some of the languages: null (check the context>mockData>mockRepos.js) so we first remove the language:null
    if (!language) {
      //if the language is not null return the language
      return total;
    }

    //if the language doesn't exists before
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }; //value:1 since this is the first time we have this language
    }
    //if the language exists before
    else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }; //first bring the previous property
    }
    return total; 
  }, {});

  //**Add real data to pie chart
  //now in the pie chart we only want to show maximum 5 languages (first 5 highest value language)
  const mostUsed = Object.values(languages);
  mostUsed
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  //**Add real data to Doughnut chart-most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    });

  //**Add real data to Column3D (show stars) and Bar3D (show forks) charts- stars and forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count }; //in the stars object create a new property (stargazers_count)
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  //convert the object to arrays and sort it (for stars)
  stars = Object.values(stars).slice(-5).reverse(); //highest numbers are at the end that's why we use the last 5 and then reverse it to see from highest stars to lowest stars
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr; //in the bigger screen the first column is 2 fraction and the second column is 3 fraction
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
