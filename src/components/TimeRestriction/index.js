import React, { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import "./TimeRestrictionDialog.css"; // Import the external CSS file
import { useLocation } from "react-router-dom";

const TimeRestrictionDialog = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkTime = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 23 || currentHour < 9) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    location?.pathname !== "/order-history" && checkTime();
  }, []);

  return (
    <Dialog
      open={open}
      aria-labelledby="time-restriction-dialog"
      className="time-restriction-dialog"
    >
      <div className="dialog-container">
        {/* Title */}
        <h2 className="dialog-title">We're Closed for Now</h2>

        {/* Content */}
        <p className="dialog-content">
          Dear valued customers, we do not accept orders between{" "}
          <strong>11 PM and 9 AM</strong>. We appreciate your understanding and
          look forward to serving you during our business hours.
        </p>

        {/* Horizontal Line */}
        <hr className="dialog-divider" />

        {/* Thank You */}
        <p className="dialog-thank-you">
          Thank <span className="thank-you-you">you!</span>
        </p>
      </div>
    </Dialog>
  );
};

export default TimeRestrictionDialog;
