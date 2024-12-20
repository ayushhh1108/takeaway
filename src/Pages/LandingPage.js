import React, { useEffect } from "react";
import Header from "../components/header";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import landing_vector from "../assets/landing2.png";
import ContactUs from "../assets/contact-us.png";
import { Link, useParams } from "react-router-dom";
import {
  BsFillPlayBtnFill,
  BsFillPeopleFill,
  BsCashCoin,
  BsMenuButtonWideFill,
} from "react-icons/bs";
import {
  MdOutlineQrCodeScanner,
  MdOutlineSecurity,
  MdPayments,
} from "react-icons/md";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sendMail } from "./action";
import { BsArrowRight } from "react-icons/bs";
import {
  AdminPanelOverview,
  OrderFulfillmentSection,
} from "../components/Helper";

const HomePage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const path = useParams();
  useEffect(() => {
    if (path?.id) {
      localStorage.setItem("ref", path?.id);
    }
  }, []);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    subject: yup.string().required("Subject is required"),
    name: yup.string().required("Name is required"),
    message: yup.string().required("Message is required"),
  });
  const handleSignIn = async (value, reset) => {
    setOpen(true);
    await dispatch(sendMail(JSON.stringify(value)));
    reset();
    setOpen(false);
  };
  return (
    <div className="bg-[#eee3cf] min-h-screen overflow-hidden">
      <Header />
      <Backdrop sx={{ zIndex: 1400 }} open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Box className="flex flex-col sm:flex-col md:flex-row">
        <Box className="basis-1/2">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[500px] sm:min-h-[80vh] m-auto flex justify-center flex-col text-[#484756]"
          >
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-5xl lg:text-start font-extrabold  ">
              Grow Your Takeaway <p className="text-[#5a5869]">Orders</p> with
              Efficiency
            </h1>
            <p className="md:text-sm  lg:text-start lg:text-base 2xl:text-base">
              Provide customers with a fast, seamless online ordering
              experience—boost your takeaway orders and simplify your
              operations.
            </p>
            <div className="flex mt-4 justify-center lg:justify-start ">
              <a href="tel:9638121878">
                <Button
                  variant="contained"
                  className="!normal-case"
                  endIcon={<BsArrowRight />}
                >
                  {" "}
                  Contact Now
                </Button>
              </a>
            </div>
          </motion.div>
        </Box>
        <Box className="basis-1/2 flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            alt="side-menu-image"
            className="w-[320px] sm:w-[400px] md:w-full lg:w-[600px] 2xl:w-[600px]"
            src={landing_vector}
          />
        </Box>
      </Box>
      <Box className="flex justify-center mt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[80%] relative flex flex-wrap justify-around text-[#e5dfd2] bg-[#8885a2] rounded-2xl"
        >
          <div className="py-10 px-5">
            <h4 className="text-4xl font-bold">QR Code</h4>
            <p>for Access</p>
          </div>
          <div className="py-10 px-5">
            <h4 className="text-4xl font-bold">Verification </h4>
            <p>for Security</p>
          </div>
          <div className="py-10 px-5">
            <h4 className="text-4xl font-bold">Menu</h4>
            <p>for not Confusion</p>
          </div>
          <div className="py-10 px-5">
            <h4 className="text-4xl font-bold">Order Details</h4>
            <p>for Easy to deliver</p>
          </div>
          <div className="py-10 px-5">
            <h4 className="text-4xl font-bold">Payment Gateway</h4>
            <p>for Safty</p>
          </div>
        </motion.div>
      </Box>
      <Box className="bg-[#8885a2] min-h-[80vh] py-20 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-5xl text-[#e5dfd2] font-extrabold  mb-3"
        >
          Streamlined Ordering for Customers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 w-[80%] lg:w-[50%] md:text-sm lg:text-base 2xl:text-base text-white mx-auto"
        >
          Customers can quickly place their takeaway orders online with just a
          few clicks—no calls, no waiting, just fast and convenient service
          every time.
        </motion.p>
        <div className="font-sans  w-full flex flex-row justify-center items-center flex-wrap">
          <IconContext.Provider value={{ color: "#484756", size: 42 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card rounded-2xl w-96 mx-10 py-14 px-10 my-6 bg-white  shadow-xl hover:shadow"
            >
              <MdOutlineQrCodeScanner className="mx-auto" />
              <div className="text-center mt-2 text-3xl font-medium">
                Scan QR
              </div>
              <div className="text-center mt-2 font-light text-sm">
                Customers scan a QR code (e.g., through Linktree) to start the
                order process.
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card rounded-2xl w-96 mx-10 py-14 px-10 my-6 bg-white  shadow-xl hover:shadow"
            >
              <MdOutlineSecurity className="mx-auto" />
              <div className="text-center mt-2 text-3xl font-medium">
                Verification for Security
              </div>
              <div className="text-center mt-2 font-light text-sm">
                Enter name and phone number to avoid fake or fraudulent orders.
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card rounded-2xl w-96 mx-10 py-14 px-8  my-6 bg-white  shadow-xl hover:shadow"
            >
              <BsMenuButtonWideFill className="mx-auto" />
              <div className="text-center mt-2 text-3xl font-medium">
                Menu and Order Details
              </div>
              <div className="text-center mt-2 font-light text-sm">
                Full menu available for item selection. Additional fields:
                Vehicle number and color for easy delivery.
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card rounded-2xl w-96 mx-10 py-14 px-8  my-6 bg-white  shadow-xl hover:shadow"
            >
              <MdPayments className="mx-auto" />
              <div className="text-center mt-2 text-3xl font-medium">
                Payment Options
              </div>
              <div className="text-center mt-2 font-light text-sm">
                Online payments redirect to secure gateways. Cash payment option
                available for confirmation.
              </div>
            </motion.div>
          </IconContext.Provider>
        </div>
      </Box>
      <AdminPanelOverview />
      <OrderFulfillmentSection />
      <Box
        id="contact-us"
        className="flex py-16 items-center flex-col sm:flex-col md:flex-row"
      >
        <Box className="basis-1/2">
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" mx-auto w-[320px] sm:w-[350px] md:w-full lg:w-[500px] 2xl:w-[500px]"
            src={ContactUs}
            alt="ContactUs"
          />
        </Box>
        <Box className="mx-auto basis-1/2 w-full sm:max-w-[1920px] px-4 md:px-8 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-full lg:w-2/3 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7"
          >
            <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
              <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
                Get in touch
              </h4>
            </div>
            <Formik
              className="w-full flex flex-col justify-center "
              initialValues={{
                name: "",
                email: "",
                subject: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSignIn(values, resetForm);
              }}
            >
              {({ errors, touched, handleSubmit, handleChange, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col sm:flex-row md:flex-row space-y-5 sm:space-y-0 gap-4">
                      <div className="w-full sm:w-1/2 md:w-1/2 ">
                        <label
                          htmlFor="name"
                          className="block text-start text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                        >
                          Your Name (required)
                        </label>
                        <TextField
                          value={values.name}
                          onChange={handleChange}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          name="name"
                          id="outlined-basic"
                          className="w-full"
                          placeholder="Name"
                          variant="outlined"
                        />
                      </div>
                      <div className="w-full mt-2 sm:w-1/2 sm:mt-0 ">
                        <label
                          htmlFor="email"
                          className="block text-start text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                        >
                          Your Email (required)
                        </label>
                        <TextField
                          onChange={handleChange}
                          value={values.email}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          name="email"
                          className="w-full"
                          id="outlined-basic"
                          placeholder="Email"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="subject"
                        className="block text-start text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                      >
                        Subject
                      </label>
                      <TextField
                        onChange={handleChange}
                        value={values.subject}
                        error={touched.subject && Boolean(errors.subject)}
                        helperText={touched.subject && errors.subject}
                        name="subject"
                        id="outlined-basic"
                        placeholder="Subject"
                        className="w-full"
                        variant="outlined"
                      />
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="message"
                        className="block text-start text-gray-600 font-semibold text-sm leading-none mb-3"
                      >
                        Message
                      </label>
                      <TextField
                        onChange={handleChange}
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message && errors.message}
                        name="message"
                        value={values.message}
                        id="outlined-multiline-static"
                        placeholder="Message"
                        multiline
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    <div className="relative">
                      <Button type="submit" variant="contained">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </motion.div>
        </Box>
      </Box>
      <Box className="bg-[#aca8cf] py-5 text-gray-800">
        <Link to={`/Terms-Conditions`}>
          <Typography variant="caption" class="px-2 text-hover">
            Terms & Conditions
          </Typography>
        </Link>
        <a href={`#contact-us`}>
          <Typography
            variant="caption"
            class="px-2 border-l text-hover border-[#807f7f]"
          >
            Contact us
          </Typography>
        </a>
        <Link to={`/privacy-policy`}>
          <Typography
            variant="caption"
            class="px-2 border-l text-hover border-[#807f7f]"
          >
            Privacy Policy
          </Typography>
        </Link>
      </Box>
      <Box className="bg-[#8885a2] py-10 text-white">
        <Typography variant="subtitle2">
          © Copyright 2024{" "}
          <span className="text-[#e5dfd2]">
            TAKE <span className="text-[#5a5869]">A</span> WAY
          </span>
          . All Rights Reserved
        </Typography>
        <Typography className=" text-[#e5dfd2]" variant="caption">
          All trademarks and logos appearing on the site are the property of
          their respective owners.
        </Typography>
      </Box>
    </div>
  );
};
export default HomePage;
