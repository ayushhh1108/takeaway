import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import adminImage from "../../assets/Business analytics-cuate.png"; // Replace this with the path to your image
import { RiMapPinTimeFill } from "react-icons/ri";
import { GiDeliveryDrone } from "react-icons/gi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const AdminPanelOverview = () => {
  return (
    <div className="bg-[#FFF3E4] py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-5xl lg:text-start font-extrabold mb-4 ">
            <p className="text-[#5a5869]">Simplified Management Interface</p>{" "}
          </h1>
          <Typography
            variant="body1"
            className="text-[#4B3F29] mb-6 leading-relaxed md:text-sm  lg:text-start lg:text-base 2xl:text-base mb-5"
          >
            Streamline your workflow with our user-friendly admin panel. Manage
            orders effortlessly and keep customers informed with ease.
          </Typography>
          <div className="mt-5">
            <Typography
              variant="h5"
              className="text-[#4B3F29]"
              style={{ fontWeight: 600 }}
            >
              Order Dashboard:
            </Typography>
            <Typography
              variant="body1"
              className="mb-6 leading-relaxed md:text-sm  lg:text-start lg:text-base 2xl:text-base mb-5 text-[#4B3F29]"
            >
              Centralized view of all placed orders.
            </Typography>
          </div>
          <div className="mt-4">
            <Typography
              variant="h5"
              style={{ fontWeight: 600 }}
              className="text-[#4B3F29] mb-2"
            >
              Order Actions:
            </Typography>
            <ul className="-inside text-[#4B3F29] mb-6">
              <li>
                <strong>Confirm Order:</strong> Notifies customers and moves
                orders to the "Confirmed Order List."
              </li>
              <li>
                <strong>Cancel Order:</strong> Requires a reason, which is sent
                to customers.
              </li>
            </ul>
          </div>
          <Button
            variant="contained"
            className="mt-5 bg-[#4B3F29] text-white hover:bg-[#3A2E21]"
          >
            Learn More
          </Button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={adminImage}
            alt="Admin Panel Overview"
            className="w-full max-w-md "
          />
        </div>
      </div>
    </div>
  );
};

const OrderFulfillmentSection = () => {
  return (
    <section className="bg-[#F5EADD] py-12">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Efficient Order Fulfillment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Streamline your order processing and delivery operations with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="flex flex-col items-center text-center">
            <RiMapPinTimeFill size={40} />
            <h3 className="mt-2 text-xl font-semibold text-gray-800">
              Tracking Prepared Orders
            </h3>
            <p className="mt-2 text-gray-600">
              Mark orders as "Prepared" and ready for pickup or delivery.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <GiDeliveryDrone size={40} />
            <h3 className="mt-2 text-xl font-semibold text-gray-800">
              Delivery Management
            </h3>
            <p className="mt-2 text-gray-600">
              Assign delivery personnel for easy identification by customers.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <IoCheckmarkDoneCircle size={40} />
            <h3 className="mt-2 text-xl font-semibold text-gray-800">Completion</h3>
            <p className="mt-2 text-gray-600">
              Mark orders as "Delivered," triggering a "Thank You" message to
              customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AdminPanelOverview, OrderFulfillmentSection };
