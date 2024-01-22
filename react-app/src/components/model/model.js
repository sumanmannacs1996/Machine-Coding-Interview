import React, { useState } from "react";
import "./style.css";

function Model({ isOpen, setOpen, handleSubmit, setFormData, formData }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      className="model"
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={(e) => {
        if (e.target.className === "model") {
          setOpen(false);
        }
      }}
    >
      <form
        className="add-new-employee"
        onSubmit={(e) => handleSubmit(e, formData)}
      >
        Add a New Employee
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (Optional)"
          value={formData.imageUrl}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          name="contactNumber"
          placeholder="Contact"
          required
          value={formData.contactNumber}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          required
          value={formData.salary}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          value={formData.address}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          className="add-employee-dob"
          value={formData.dob}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" class="add-employee-submit" value="Submit" />
      </form>
    </div>
  );
}

export default Model;
