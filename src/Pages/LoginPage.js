import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import login_back from "../assets/login.png";
import login_vector from "../assets/mobile_login_form.png";
import styled from "@emotion/styled";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { postOTPAPI, postSignInAPI, postSignUpAPI } from "./action";
import SignUpMobile from "../components/loginpageMobile";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OTP from "../components/Otp/otp";
import { toast } from "react-toastify";
import LocalStorageManager from "../utils/local-storage-manager";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [otpSection, setOTPSection] = useState(false);
  const [otpData, setOtpData] = useState();
  const isSignIn = location?.state?.isSignIn;
  const matches = useMediaQuery("(max-width:600px)");
  const mainBoxStyle = {
    backgroundImage: `url(${login_back})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    display: "flex",
    minHeight: "100vh",
  };

  const subLeftsideBox = {
    flexBasis: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const LoginBlock = styled(Box)({
    "& .heading-desc-box": {
      color: "white",
      width: "400px",
      textAlign: "left",
      paddingTop: "20px",
      "& .main-h3": {
        fontSize: "36px",
        fontWeight: 700,
      },
      "& .desc": {
        fontSize: "18px",
        marginBottom: "80px",
      },
    },
    "& .sign-up-right": {
      flexWrap: "wrap",
      "& .left-side-form": {
        width: "80%",
        display: "flex",
        flexWrap: "wrap",
        height: "300px",
        alignContent: "space-around",
        "& .input": {
          width: "75%",
          marginBottom: "12px",
        },
        "& .sign-up": {
          fontWeight: 700,
          marginBottom: "28px",
          width: "100%",
        },
        "& .submit-btn": {
          width: "100%",
          "& .submit-text": {
            fontSize: "15px",
            marginBottom: "8px",
          },
          "& .signup-btn": {
            fontSize: "15px",
            fontWeight: 700,
            textDecoration: "none",
          },
        },
      },
    },
  });

  const validationSchema = yup.object({
    name: yup.string("Enter your name number").required("Name is required"),
    number: yup
      .string("Enter your phone number")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  useEffect(() => {
    if (LocalStorageManager?.isUserAvailable()) {
      navigate("/menu");
    }
    window.scrollTo(0, 0);
  }, []);

  const handleOTPChange = (newValue) => {
    handleOTPSubmit(newValue?.join(""));
  };

  const handleSendCode = () => {
    // otpSection && navigate("/menu");
    setOTPSection(true);
  };

  const handleFail = (values) => {
    setOtpData({ number: values.number });
  };

  const handleOTPSubmit = (value) => {
    value >= 0
      ? dispatch(
          postOTPAPI(
            { number: otpData?.number, otp: value },
            navigate,
            handleFail
          )
        )
      : toast?.error("Enter OTP first");
  };

  return matches ? (
    <SignUpMobile
      isSignIn={isSignIn}
      otpSection={otpSection}
      handleSendCode={handleSendCode}
    />
  ) : (
    <LoginBlock>
      <Box style={mainBoxStyle}>
        <Box style={subLeftsideBox} className="sign-up-right">
          <Formik
            initialValues={{
              number: "",
              name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setOtpData(values);
              console.log("otpData pallu", values);
              dispatch(postSignUpAPI(values, handleSendCode));
              // handleSignIn(values);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, values }) => {
              const handlePhoneChange = (e) => {
                const value = e.target.value;

                // Allow only numeric values and limit to 10 digits
                if (/^\d{0,10}$/.test(value)) {
                  handleChange(e); // Only call handleChange if the input is valid
                }
              };

              return (
                <form onSubmit={handleSubmit}>
                  <Box className="left-side-form">
                    <Typography
                      variant="h6"
                      component="h6"
                      gutterBottom
                      className="sign-up"
                    >
                      PHONE VERIFICATION
                    </Typography>

                    {/* Phone Number Input */}
                    <Box style={{ width: "100%" }}>
                      {!otpSection ? (
                        <>
                          <Box style={{ width: "100%" }}>
                            <TextField
                              id="name"
                              label="Name"
                              variant="standard"
                              name="name"
                              value={values?.name}
                              className="input"
                              onChange={handleChange} // Standard handleChange for name
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </Box>
                          <TextField
                            id="number"
                            label="Phone Number"
                            variant="standard"
                            name="number"
                            value={values?.number}
                            className="input"
                            onChange={handlePhoneChange} // Use the custom handler
                            error={touched.number && Boolean(errors.number)}
                            helperText={touched.number && errors.number}
                            type="tel" // Set input type to 'tel' for numeric input
                            inputMode="numeric" // Ensures numeric keyboard on mobile devices
                          />
                        </>
                      ) : (
                        <OTP handleOtpChange={handleOTPChange} />
                      )}
                    </Box>
                    <Box className="submit-btn">
                      {otpSection ? (
                        <Typography
                          variant="body1"
                          component="p"
                          className="submit-text "
                        >
                          Don't receive the OTP?
                          <span
                            onClick={() => {
                              console.log("otpData pallu", values, otpData);
                              dispatch(
                                postSignUpAPI(
                                  {
                                    number: otpData?.number,
                                    name: otpData?.name,
                                  },
                                  handleSendCode
                                )
                              );
                            }}
                            style={{ color: "#ffd585" }}
                          >
                            {" "}
                            RESEND OTP
                          </span>
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          component="p"
                          className="submit-text "
                        >
                          We need to register your phone number before getting
                          <span style={{ color: "#000000" }}> started!</span>
                        </Typography>
                      )}
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#000000", color: "#ffd585" }}
                        onClick={otpSection ? handleOTPSubmit : handleSubmit}
                      >
                        {otpSection ? "Verify Phone Number" : "Send the Code"}
                      </Button>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Box>
        <Box style={subLeftsideBox}>
          <Box className="heading-desc-box">
            <Typography
              variant="h3"
              component="h3"
              gutterBottom
              className="main-h3"
            >
              Wellcome Back!
            </Typography>
            <Typography variant="body1" component="p" className="desc">
              Pick up wherer you left off
            </Typography>
            <img src={login_vector} alt={"register"} width={"450px"} />
          </Box>
        </Box>
      </Box>
    </LoginBlock>
  );
};
export default LoginPage;
