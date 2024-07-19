import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdb-react-ui-kit";
import './Error.css'; // Import your CSS file for custom styling

const Error = () => {
  return (
    <MDBContainer className="error-container">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard className="mt-5">
            <MDBCardBody>
              <h1 className="text-center mb-4">
                <MDBIcon icon="exclamation-circle" className="mr-2" />
                Error 404
              </h1>
              <p className="text-center">
                Page not found. Please check the URL and try again.
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Error;
