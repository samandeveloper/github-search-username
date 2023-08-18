//this is the homepage
import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components"; // all of these components will be added to this page
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  //the first loading spinner happens on the dashboard page
  const { isLoading } = React.useContext(GithubContext); //bring the isLoading
  //we need to have two returns in the dashboard page, one of them when the dashboard page is loading and the other when it's not loading:

  //1. return for when the dashboard page is loading - we have navbar and search (our preference)
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="loading" />
      </main>
    );
  }

  //2. return for when the dashboard page is NOT loading
  return (
    //Note: all the below components can be tag closed or self closed
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
