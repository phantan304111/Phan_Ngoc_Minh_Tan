import React from "react";
import Header from "../../components/Header/Header";
import ExchangeForm from "../../components/Form/ExchangeForm";
import SignForm from "../../components/Form/SignForm";


const Home = (props) => {
  return (
    <div>
      <Header />
      <ExchangeForm />
      <SignForm />
    </div>
  );
};

export default Home;
