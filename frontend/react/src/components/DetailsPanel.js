import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveToFactList } from "../actions/facts";
import { MDBListGroup, MDBListGroupItem, MDBContainer,MDBCol,MDBCard,MDBCardBody,MDBBtn } from "mdbreact";
import FactsService from "../services/facts.service";
import moment from 'moment';

const DetailsPanel = () => {
  const { detailedList: detailedList } = useSelector((state) => state.facts);
  const [renderedDetailedList, setRenderedDetailedList] = useState("Loading...");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  /**
   * save details panel facts to facts.json file on the server
   */
  const onSave = () =>{
    setMessage("Loading...");
    setIsButtonDisabled(true);
    const facts = detailedList.map(function(fact) {
      return {text:fact.text,createdAt:moment(fact.createdAt).format('DD/MM/YY hh:mm')}
    });
    const factJson = JSON.stringify(facts);
    FactsService.saveJson(factJson).then(
      (response) => {
        setIsButtonDisabled(false);
          if(response.data.status === "OK"){
            setMessage("Saved successfully (https://godbapps.com/sciPlay/backend/php-vanila/facts.json)");
          }else{
            setMessage(response.data.error);
          }
        },
      (error) => {
        setIsButtonDisabled(false);
        setMessage("Error occured");
      }
    );
  }

  
  /** move fact from panel to facts list */
  const handleDoubleClickFact = (fact) =>{
    dispatch(moveToFactList(fact))
    .then(() => {
    })
    .catch(() => {
    });
  }

  /**
   * when detailed facts list change rerender the panel
   */
  useEffect(() => {
      const renderedListDynamic = detailedList.map(function(fact) {
        return <MDBListGroupItem onDoubleClick={() => handleDoubleClickFact(fact)} className="pointer" key={fact._id}>{fact.text}<hr/>{moment(fact.createdAt).format('DD/MM/YY hh:mm')}</MDBListGroupItem>
      });
      setRenderedDetailedList(renderedListDynamic);

      if(detailedList.length !== 0){
        setIsButtonDisabled(false);
      }else{
        setIsButtonDisabled(true);
      }
  }, [detailedList]);


  return (
    <MDBCol size="6" className="text-center">
      <MDBCard>
        <MDBCardBody>
          <h2>Details panel</h2>
          <MDBContainer>
            <MDBListGroup>
             {renderedDetailedList}
            </MDBListGroup>
        </MDBContainer>
        {isButtonDisabled ? (
          <MDBBtn disabled color="primary">Save</MDBBtn>
          ) : (
            <MDBBtn onClick={onSave} color="primary">Save</MDBBtn>)}
            <p>{message}</p>
        </MDBCardBody>
      </MDBCard>
      </MDBCol>);
};

export default DetailsPanel;
