import "./App.css";
import React, { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});  // To store error messages for each field

  const clickHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (e) => {
    // Close the modal if the user clicks outside the modal content
    if (e.target.className === "modal") setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { username, email, phoneNo, dob } = e.target;
    let validationErrors = {};  // Object to hold error messages

    // Validate Username
    if (!username.value) {
      validationErrors.username = "Username is required.";
    }

    // Validate Email
    if (!email.value) {
      validationErrors.email = "Email is required.";
    } else if (!email.value.includes("@")) {
      validationErrors.email = "Invalid email. Please check your email address.";
    }

    // Validate Phone Number
    if (!phoneNo.value) {
      validationErrors.phoneNo = "Phone number is required.";
    } else if (phoneNo.value.toString().length !== 10) {
      validationErrors.phoneNo = "Invalid phone number. Please enter a 10-digit phone number.";
    }

    // Validate Date of Birth
    if (!dob.value) {
      validationErrors.dob = "Date of Birth is required.";
    } else if (new Date(dob.value).getTime() > Date.now()) {
      validationErrors.dob = "Invalid date of birth. Date of birth cannot be in the future.";
    }

    // Set errors if validation fails
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // If no errors, reset form and close modal
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.phoneNo.value = "";
      e.target.dob.value = "";
      setIsOpen(false);  // Close the modal
    }
  };

  return (
    <div className="App">
      <button onClick={clickHandler}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={closeHandler}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>User Details Modal</h1>
            <form onSubmit={submitHandler}>
              <h2>Fill Details</h2>
              <div className="input-group">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" id="email" required />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input type="number" name="phoneNo" id="phone" required />
                {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" name="dob" id="dob" />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
