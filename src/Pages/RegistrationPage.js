import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import register from "../assets/register.jpg";
import registerPeople from "../assets/register.png";
import maleImg from "../assets/male.jpg";
import femaleImg from "../assets/female.jpeg.jpg";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import styled from "@emotion/styled";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ref } from "yup";
import { postSignUpAPI } from "./action";
import { useDispatch } from "react-redux";
import SignUpMobile from "../components/loginpageMobile";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:600px)');
  const [gender, setGender] = useState("Female");
  const [male, setMale] = useState(false);
  const [mainValues, setMainValues] = useState({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
  })
  const dispatch = useDispatch();
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          //   backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
          borderRadius: "16px",
          backgroundColor: "#8885a2",
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: "16px",
      backgroundColor: "#e3d8f9",
      opacity: 1,
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
  }));

  const mainBoxStyle = {
    backgroundImage: `url(${register})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    display: "flex",
    minHeight: "100vh"
  };
  const subLeftsideBox = {
    flexBasis: "50%",
  };

  const RegisterBlock = styled(Box)({
    "& .heading-desc-box": {
      color: "white",
      width: "400px",
      paddingTop: "20px",
      textAlign: "left",
      margin: "40px auto",
      "& .main-h3": {
        fontSize: "36px",
        fontWeight: 700,
        color: " #e5dfd2"
      },
      "& .desc": {
        fontSize: "18px",
      },
    },
    "& .sign-up-right": {
      marginTop: "40px",
      "& .input": {
        width: "75%",
        marginBottom: "12px",
      },
      "& .sign-up": {
        fontWeight: 700,
        marginBottom: "28px",
        color: "#484756"
      },
      "& .genders-box": {
        marginBottom: "50px",
        "& .genders-img-box": {
          width: "100px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto",
        },
        "& .switch-togle": {
          display: "inline-block",
          margin: "0 auto",
        },
      },
      "& .form": {
        "& .submit-btn": {
          marginTop: "50px",
          "& .submit-text": {
            fontSize: "15px",
            marginBottom: "8px",
          },
        },
      },
    },
  });

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup.string("Enter your Name").required("Name is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirm_password: yup
      .string("Enter your Confirm Password")
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Passwords does not match"),
  });

  const handleSignUp = async(values) => {
    delete values.confirm_password;
    let ref = localStorage.getItem('ref');
    let payload = {...values,gender: gender};
    if(ref){
      payload.referral = ref;
      localStorage.removeItem('ref')
    }
    await dispatch(postSignUpAPI(JSON.stringify(payload),navigate))
  }

  return (
    matches?
    <SignUpMobile/>:
    <RegisterBlock>
      <Box style={mainBoxStyle}>
        <Box style={subLeftsideBox}>
          <Box className="heading-desc-box">
            <Typography
              variant="h3"
              component="h3"
              gutterBottom
              className="main-h3"
            >
              We'er are so glad to have you on board!
            </Typography>
            <Typography variant="body1" component="p" className="desc">
              Join millions of designers all over <br /> the world and keep up
              with the <br /> trends in the design world
            </Typography>
            <img src={registerPeople} alt={"register"} width={"500px"} />
          </Box>
        </Box>
        <Box style={subLeftsideBox} className="sign-up-right">
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            className="sign-up"
          >
            Sign Up
          </Typography>
          <Formik
              initialValues={mainValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSignUp(values)
              }}
              
            >
              {({ errors, touched, handleChange, handleSubmit, values }) => (
                <>
                <Box className="genders-box">
                  <Box className="genders-img-box">
                    <img
                      src={male ? maleImg : femaleImg}
                      alt={"femaleImg"}
                      width={"100px"}
                    />
                  </Box>
                  <FormGroup className="switch-togle">
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          onChange={(value) => {
                            setMale(value.target.checked);
                            setGender(value.target.checked ? "Male" : "Female");
                            setMainValues(values)
                          }}
                          checked={male}
                        />
                      }
                      label={gender}
                    />
                  </FormGroup>
                </Box>
                <Box className="form">
                      <form >
                        <TextField
                          id="name"
                          name="name"
                          label="Name"
                          variant="standard"
                          className="input"
                          value={values.name}
                          onChange={handleChange}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <TextField
                          id="email"
                          name="email"
                          label="Email Address"
                          variant="standard"
                          value={values.email}
                          className="input"
                          onChange={handleChange}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                        <TextField
                          id="password"
                          name="password"
                          label="Password"
                          value={values.password}
                          variant="standard"
                          className="input"
                          onChange={handleChange}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                        <TextField
                          id="confirm_password"
                          name="confirm_password"
                          label="Confirm Password"
                          values={values.confirm_password}
                          variant="standard"
                          className="input"
                          onChange={handleChange}
                          error={
                            touched.confirm_password &&
                            Boolean(errors.confirm_password)
                          }
                          helperText={
                            touched.confirm_password && errors.confirm_password
                          }
                        />
                        <Box className="submit-btn">
                          <Typography
                            variant="body1"
                            component="p"
                            className="submit-text "
                          >
                            You're all set up!
                          </Typography>
                          <Typography
                          variant="body1"
                          component="p"
                          className="submit-text "
                        >
                          I'm Already member! 
                          <Typography
                            variant="body1"
                            component="a"
                            className="signup-btn submit-text"
                            href={"/login"}
                          >
                            {" Signin"} 
                            <span style={{ color: "#8885a2" }}>
                              {" here"}
                            </span>
                          </Typography>
                        </Typography>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#8885a2" }}
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Complete
                          </Button>
                        </Box>
                      </form>
                </Box>
                </>
              )}
            </Formik>
        </Box>
      </Box>
    </RegisterBlock>
  );
};
export default RegisterPage;
