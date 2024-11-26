import "./App.css";
import React, { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);  // State to control modal visibility

  // Open modal when "Open Form" is clicked
  const clickHandler = () => {
    setIsOpen(true);
  };

  // Close the modal when clicking outside of the modal content
  const closeHandler = (e) => {
    // Only close if clicked outside the modal content (on the modal background)
    if (e.target.className === "modal") {
      setIsOpen(false);
    }
  };

  // Handle form submission with validation
  const submitHandler = (e) => {
    e.preventDefault();

    // Validate phone number length
    if (e.target.phoneNo.value.toString().length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } 
    // Validate if date of birth is not in the future
    else if (new Date(e.target.dob.value).getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } 
    else {
      // Reset form fields if submission is valid
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.phoneNo.value = "";
      e.target.dob.value = "";

      // Close the modal after submission
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      {/* Button to open the modal */}
      <button onClick={clickHandler}>Open Form</button>

      {/* Modal */}
      {isOpen && (
        <div className="modal" onClick={closeHandler}>
          {/* Modal Content */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>User Details Modal</h1>
            <form onSubmit={submitHandler}>
              <h2>Fill Details</h2>
              <div className="input-group">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" id="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input type="number" name="phoneNo" id="phone" required />
              </div>
              <div className="input-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" name="dob" id="dob" />
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
