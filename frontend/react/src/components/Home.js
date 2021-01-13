import React from "react";
import FactsList from './FactsList';
import DetailsPanel from "./DetailsPanel";
import { MDBRow,MDBContainer } from "mdbreact";

const Home = () => {  

  return (
      <MDBContainer>
        <MDBRow>
          <FactsList/>
          <DetailsPanel/>
        </MDBRow>
      </MDBContainer>
  );
};

export default Home;
