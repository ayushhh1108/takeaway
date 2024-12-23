import {
  Box,
  Button,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import "./index.css";
import team2 from "../../assets/login_mobile.png";
import arrow from "../../assets/right-arrow.png";
import formTopVector from "../../assets/mobile_login_form.png";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTP from "../Otp/otp";

function SignUpMobile({ isSignIn, otpSection, handleSendCode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popupForm, setPopupForm] = useState(false);
  const [mainValues, setMainValues] = useState({ phone: "" });
  const [click, setClick] = useState(false);
  const [validationSchema, setSchema] = useState(
    yup.object({
      phone: yup
        .string("Enter your phone number")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    })
  );

  useEffect(() => {
    if (isSignIn) {
      handleArrowClick();
    }
  }, []);

  const [otp, setOtp] = useState("");
  const handleOTPChange = (newValue) => {
    setOtp(newValue);
  };

  const textFieldHandler = (errors, touched, handleChange, values) => {
    const handlePhoneChange = (e) => {
      const value = e.target.value;
      if (/^\d{0,10}$/.test(value)) {
        handleChange(e);
      }
    };

    return (
      <>
        <Box style={{ width: "100%" }}>
          <TextField
            id="name"
            label="Name"
            variant="standard"
            name="name"
            value={values?.name}
            className="input-mobile"
            onChange={handleChange} // Standard handleChange for name
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </Box>
        <Box style={{ width: "100%" }}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            variant="standard"
            className="input-mobile"
            onChange={handlePhoneChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
            type="tel"
            inputMode="numeric"
            value={values}
          />
        </Box>
      </>
    );
  };

  const drawerBottom = () => {
    return (
      <SwipeableDrawer
        anchor={"bottom"}
        open={popupForm}
        onClose={() => {
          setPopupForm(false);
        }}
        transitionDuration={{ appear: 600, enter: 600, exit: 500 }}
        className="main-drawer"
        style={{ height: "100%" }}
      >
        <Box className="main-model">
          <Box className="form-top">
            <img
              src={formTopVector}
              alt="form-top"
              className="form-top-vector"
            />
          </Box>
          <Formik
            initialValues={mainValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSendCode();
              // login
              //   ? dispatch(postSignInAPI(values, navigate))
              //   : handleSignUp(values);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <Box className="login-form">
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom
                    className="sign-up-mobile"
                  >
                    Phone Verification
                  </Typography>
                  {otpSection ? (
                    <OTP />
                  ) : (
                    textFieldHandler(
                      errors,
                      touched,
                      handleChange,
                      values?.phone
                    )
                  )}
                  <Box className="submit-box">
                    <Typography
                      variant="body1"
                      component="p"
                      className="submit-text "
                    >
                      We need to register your phone number before getting
                      <span style={{ color: "#ffd585" }}> started!</span>
                    </Typography>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#000000", margin: "15px 0px" }}
                      type="submit"
                    >
                      {otpSection ? "Verify Phone Number" : "Send the Code"}
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </SwipeableDrawer>
    );
  };

  const handleArrowClick = () => {
    setClick(true);
    setTimeout(() => {
      setPopupForm(true);
    }, 500);
  };

  return (
    <Box className="signUpPage">
      {drawerBottom()}
      <Box className="headings">
        <Box className="img-box">
          <img src={team2} alt="team" className="main-img" />
        </Box>
        <Typography
          component={"h3"}
          variant="h3"
          fontSize="23px"
          style={{ padding: "10px 20px 0px 20px" }}
        >
          Your Perfect <span style={{ color: "#ffd585" }}>Coffee </span> Awaits!
        </Typography>
        <Typography
          component={"p"}
          variant="p"
          style={{ fontSize: "14px", padding: "20px" }}
        >
          Almost there! Just verify your phone number, and we’ll get you to your
          coffee in no time.
        </Typography>
      </Box>
      <Box className="signup-buttons">
        <Box className="right-side-arrow" onClick={handleArrowClick}>
          <img
            src={arrow}
            alt="team"
            className={!click ? "arrow-png" : "arrow-png arrow-png-active"}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default SignUpMobile;
