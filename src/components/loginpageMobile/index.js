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
import { postSignInAPI, postSignUpAPI } from "../../Pages/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUpMobile({ isSignIn }) {
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

  const handleSignUp = async (values) => {
    delete values.confirm_password;
    const payload = JSON.stringify({ ...values, gender: "male" });
    await dispatch(postSignUpAPI(payload, navigate));
  };

  const textFieldHandler = (errors, touched, handleChange) => {
    return (
      <Box style={{ width: "100%" }}>
        <TextField
          id="phone"
          name="phone"
          label="Phone Number"
          variant="standard"
          className="input-mobile"
          onChange={handleChange}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
      </Box>
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
        transitionDuration={{ appear: 1200, enter: 1200, exit: 1000 }}
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
              // login
              //   ? dispatch(postSignInAPI(values, navigate))
              //   : handleSignUp(values);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
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
                  {textFieldHandler(errors, touched, handleChange)}
                  <Box className="submit-box">
                    <Typography
                      variant="body1"
                      component="p"
                      className="submit-text "
                    >
                      We need to register your phone number before getting
                      <span style={{ color: "#d9b75d" }}> started!</span>
                    </Typography>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#9f8e7c", margin: "15px 0px" }}
                      type="submit"
                    >
                      Send the Code
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
    }, 1100);
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
          Your Perfect <span style={{ color: "#d9b75d" }}>Coffee </span> Awaits!
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
