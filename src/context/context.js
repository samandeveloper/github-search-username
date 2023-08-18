// context API file
import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios"; //or use fetch API library

const rootUrl = "https://api.github.com"; //this is the url we have for the context API (root url)

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  //add the three mockup files (mockUser, mockRepos, mockFollowers) to the value using states
  const [githubUser, setGithubUser] = useState(mockUser); //githubUser is used when we create card component (users info) and info (4 sections) component
  const [repos, setRepos] = useState(mockRepos); //repos is used for charts components
  const [followers, setFollowers] = useState(mockFollowers); //followers is used in Followers component
  //get Github API
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });

  //check if the github username is valid
  const searchGithubUser = async (user) => {
    toggleError(); //adding this line we make sure that if an error happens then we remove it in the browser
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`) //we don't have .then here
      .catch((err) => console.log(err));
    //our username request is successful
    if (response) {
      setGithubUser(response.data); //the Github user in the browser is in response.data
      //bring the repos and followers of each user:
      const { login, followers_url } = response.data;

      //optional:  to display all the data at once after loading, instead of the repos and followers, write below lines:
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      //our username request is not successful and it's undefined so we use toggleError
      toggleError(true, "there is no user with that username");
    }
    //hide the loading spinner on the dashboard page once we are done with the request (find the github username) as well as check request (how many request left for the user)
    checkRequests(); //find the remaining request
    setIsLoading(false);
  };

  //check rate:
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data; //destructure the remaining from the rate object in the data object
        setRequests(remaining); //set the request to the remaining-to show that if the request = 0 then we hide the button make it setRequests(0)
        //if there is no request left for the user throw an error (toggleError function)
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  //function for error
  function toggleError(show = false, msg = "") {
    //by default show is false, and if it's false we don't see any error
    setError({ show, msg });
  }
  useEffect(() => {
    console.log("hey app loaded");
    checkRequests(); //call the check request functions
  }, []); //run once
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

//export both GithubContext and GithubProvider
//Note1: we need the GithubProvider since we want to wrap our application inside the provider
//Note2: we need the GithubContext so we want to access to the value (value={}) in the application
export { GithubContext, GithubProvider };
