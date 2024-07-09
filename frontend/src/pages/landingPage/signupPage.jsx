import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBValidationItem,
  MDBValidation,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail } from "../../features/userAuthSlice";
import { useSignup } from "../../hooks/useSignup";
import Headers from "./header";
import Canvas from "./canvas";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, error } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const { signupSubmit } = useSignup();

  const handleSubmit =async (e) => {
   const success =await signupSubmit(name, email, password, cnfPassword);
   if (success) {
    navigate('/home')
  }
  };

  return (
    <>
    <Headers></Headers>
    <div style={{
      backgroundColor:'black',
      height:'90vh'
    }}>

    <Canvas></Canvas>
      <MDBValidation>
        <MDBContainer
          fluid
          className="d-flex align-items-center justify-content-center"
         
        >
          <MDBCard
            className="bg-dark text-white m-4 "
            style={{ maxWidth: "600px" }}
          >
            <MDBIcon
              icon="arrow-left"
              onClick={() => {
                navigate(-1);
              }}
              className="mx-3 my-2"
              style={{ cursor: "pointer" }}
            />
            <MDBCardBody className="px-5">
              <h4 className="text-uppercase text-center mb-3">
                Create an account
              </h4>
              <MDBValidationItem
                tooltip
                feedback="Please type your name."
                invalid
                className=""
              >
                <MDBInput
                  onChange={(e) => setName(e.target.value)}
                  className="text-white"
                  wrapperClass="mb-4"
                  value={name}
                  labelClass="text-white"
                  label="Your Name"
                  size="lg"
                  id="form1"
                  type="text"
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                tooltip
                feedback="Mail id is needed."
                invalid
                className=""
              >
                <MDBInput
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  className="text-white"
                  wrapperClass="mb-4"
                  value={email}
                  labelClass="text-white"
                  label="Your Email"
                  size="lg"
                  id="form2"
                  type="email"
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                tooltip
                feedback="Please enter a password."
                invalid
                className=""
              >
                <MDBInput
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-white"
                  wrapperClass="mb-4"
                  value={password}
                  labelClass="text-white"
                  label="Password"
                  size="lg"
                  id="form3"
                  type="password"
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                tooltip
                feedback="Please enter a password."
                invalid
                className=""
              >
                <MDBInput
                  onChange={(e) => setCnfPassword(e.target.value)}
                  className="text-white"
                  wrapperClass="mb-4"
                  value={cnfPassword}
                  labelClass="text-white"
                  label="Repeat your password"
                  size="lg"
                  id="form4"
                  type="password"
                  required
                />
              </MDBValidationItem>
              <div className="d-flex flex-row justify-content-center mb-3">
                <MDBValidationItem feedback="" invalid className="">
                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    label="I agree all statements in Terms of service"
                    required
                  />
                </MDBValidationItem>
              </div>
              <p className="text-danger">{error && error}</p>
              <MDBBtn
                type="submit"
                onClick={handleSubmit}
                className="mb-4 w-100 gradient-custom-4"
                size="lg"
              >
                Register
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </MDBValidation>
    </div>
    </>
  );
}

export default SignupPage;
