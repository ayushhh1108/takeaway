import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import login_back from "../assets/login.jpg";
import login_vector from "../assets/login_vector.png";
import styled from "@emotion/styled";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { postSignInAPI } from "./action";
import SignUpMobile from "../components/loginpageMobile";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
    phone: yup
      .string("Enter your phone number")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const handleSignIn = async (values) => {
    dispatch(postSignInAPI(JSON.stringify(values), navigate));
  };

  return matches ? (
    <SignUpMobile isSignIn={isSignIn} />
  ) : (
    <LoginBlock>
      <Box style={mainBoxStyle}>
        <Box style={subLeftsideBox} className="sign-up-right">
          <Formik
            initialValues={{
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSignIn(values);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, values }) => (
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
                  <Box style={{ width: "100%" }}>
                    <TextField
                      id="phone"
                      label="Phone Number"
                      variant="standard"
                      name="phone"
                      value={values?.phone}
                      className="input"
                      onChange={handleChange}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Box>
                  <Box className="submit-btn">
                    <Typography
                      variant="body1"
                      component="p"
                      className="submit-text "
                    >
                      We need to register your phone number before getting
                      <span style={{ color: "#9f8e7c" }}> started!</span>
                    </Typography>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#6c6054" }}
                      // onClick={handleSubmit}
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
