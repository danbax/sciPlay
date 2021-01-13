import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveToDetailList, setFactsList } from "../actions/facts";
import { MDBListGroup, MDBListGroupItem, MDBContainer,MDBCol,MDBCard,MDBCardBody } from "mdbreact";

const FactsList = () => {
  const { factsList: factsList } = useSelector((state) => state.facts);
  const [renderedFactList, setRenderedFactList] = useState("Loading...");
  const dispatch = useDispatch();

  /**
   * set facts list from the api on first page loading
   */
  useEffect(() => {
    dispatch(setFactsList())
    .then(() => {
    })
  }, []);

  
  /**
   * On double click fact move it to details panel
   * @param Fact fact 
   */
  const handleDoubleClickFact = (fact) =>{
    dispatch(moveToDetailList(fact))
    .then(() => {
      console.log(factsList);
    })
  }

  /**
   * rerender the page when facts list changes
   */
  useEffect(() => {
      const renderedFactListDynamic = factsList.map(function(fact) {
        return <MDBListGroupItem className="pointer" onDoubleClick={() => handleDoubleClickFact(fact)} key={fact._id}>{fact.text}</MDBListGroupItem>
      });
      setRenderedFactList(renderedFactListDynamic);
  }, [factsList]);

  return (
    <MDBCol size="6" className="text-center">
      <MDBCard>
        <MDBCardBody>
          <h2>Facts List</h2>
          <MDBContainer>
            <MDBListGroup>
             {renderedFactList}
            </MDBListGroup>
        </MDBContainer>
        </MDBCardBody>
      </MDBCard>
      </MDBCol>
  );
};

export default FactsList;
