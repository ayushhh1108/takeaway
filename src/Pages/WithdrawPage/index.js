import React, { useState, useEffect } from "react";
import "./index.css";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  TextField,
} from "@mui/material";
import Sidebar from "../../components/SIdeBaar";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Paytm from "../../assets/paytm.png";
import Amazon from "../../assets/amazon.png";
import Paypal from "../../assets/paypal.png";
import Phonepe from "../../assets/phonepe.png";
import moneyPng from "../../assets/Credit card-rafiki.png";
import withdravalPage from "../../assets/withdraw.png";
import DashboardMobile from "../mobileUserDashboard";
import {useSelector} from 'react-redux'

function Withdraw() {
  const matches = useMediaQuery("(max-width:600px)");
  const data = [
    {
      label: "Paytm",
      value: "html",
      desc: (
        <div className="text-start">
          <h3 className="text-start">
            Enter your Paytm phone number/UPI id
            <span className="text-red-900">*</span>
          </h3>
          <TextField
            id="outlined-basic"
            type="text"
            className="w-full !mb-2"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<img src={withdravalPage} width="15px" />}
          >
            Withdraw
          </Button>
        </div>
      ),
      data: Paytm,
    },
    {
      label: "Phonepe",
      value: "react",
      desc: (
        <div className="text-start">
          <h3 className="text-start">
            Enter your Phonepe phone number/UPI id
            <span className="text-red-900">*</span>
          </h3>
          <TextField
            id="outlined-basic"
            type="text"
            className="w-full !mb-2"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<img src={withdravalPage} width="15px" />}
          >
            Withdraw
          </Button>
        </div>
      ),
      data: Phonepe,
    },

    {
      label: "Amazon",
      value: "vue",
      desc: (
        <div className="text-start">
          <h3 className="text-start">
            Enter your Amazon Pay phone number/UPI id
            <span className="text-red-900">*</span>
          </h3>
          <TextField
            id="outlined-basic"
            type="text"
            className="w-full !mb-2"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<img src={withdravalPage} width="15px" />}
          >
            Withdraw
          </Button>
        </div>
      ),
      data: Amazon,
    },
    {
      label: "Paypal",
      value: "angular",
      desc: (
        <div className="text-start">
          <h3 className="text-start">
            Enter your Paypal email address
            <span className="text-red-900">*</span>
          </h3>
          <TextField
            id="outlined-basic"
            type="text"
            className="w-full !mb-2"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<img src={withdravalPage} width="15px" />}
          >
            Withdraw
          </Button>
        </div>
      ),
      data: Paypal,
    },
  ];
  const [user,setUser] = useState();
  const selector = useSelector(state=> state.Reducer.AccountData);

  useEffect(()=>{
    if(selector.name){
      setUser(selector)
    }
  },[selector])
  return matches ? ( 
    <DashboardMobile>
       <Tabs className="mt-5" id="custom-animation" value="html">
              <TabsHeader className="custom-bg">
                {data.map(({ label, value, data }) => (
                  <Tab key={value} value={value}>
                    <img
                      src={data}
                      alt={label}
                      width="100px"
                      style={{ marginBottom: "3px" }}
                    />
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
        </Tabs>
        <div className="w-full px-3 transactions-box rounded-xl">
          <h2 className="text-4xl font-medium mt-4 mb-2 ms-3 text-left">Transactions</h2>
          <div className="mx-3 all-payments">
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div><div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>
            <div className="flex justify-between items-center my-3 transaction-box">
              <div>
                <h5 className="text-start text-xl font-bold">Paytm</h5>
                <p className="text-xs">17 jun 2019</p>
              </div>
              <p className="text-green-500 text-xl font-bold">1000</p>
            </div>

          </div>
        </div>
    </DashboardMobile>
   
  ) : (
     <div className="main-div">
      <Sidebar />
      <div className="main-component">
        <div className="w-full px-5 flex flex-wrap">
          <div className="w-full lg:w-1/2 px-3">
            <Box className="total-erning1">
              <Box className="earnings-text1">
                <Typography variant="p" className="earning-label1">
                  Total Earning
                </Typography>
                <Typography variant="h5" className="earning-value1">
                  ₹{user?.earnings}
                </Typography>
              </Box>
              <img
                src={moneyPng}
                alt="money-vector"
                style={{ width: "100px", borderRadius: "0px 20px 13px 0px" }}
              />
            </Box>
            <Tabs className="mt-5" id="custom-animation" value="html">
              <TabsHeader className="custom-bg">
                {data.map(({ label, value, data }) => (
                  <Tab key={value} value={value}>
                    <img
                      src={data}
                      alt={label}
                      width="100px"
                      style={{ marginBottom: "3px" }}
                    />
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
          <div className="w-full lg:w-1/2 px-3 transactions-box rounded-xl">
            <h2 className="text-4xl font-medium mt-4 mb-2 ms-3 text-left">Transactions</h2>
            <div className="mx-3 all-payments">
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div><div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>
              <div className="flex justify-between items-center my-3 transaction-box">
                <div>
                  <h5 className="text-start text-xl font-bold">Paytm</h5>
                  <p className="text-xs">17 jun 2019</p>
                </div>
                <p className="text-green-500 text-xl font-bold">1000</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Withdraw;
