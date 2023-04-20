import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './PhysicianForm.css';

function PhysicianForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState("");
  const [hospitalId, setHospitalId] = useState(1);
  const [medicalSpecialityId, setMedicalSpecialityId] = useState(1);
  const [medicalEducation, setMedicalEducation] = useState("");
  const [acceptsInsurance, setAcceptsInsurance] = useState(true);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch()


  };

  return (
    <>
      <h1>Create Physician</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Picture URL
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </label>
        <label>
          Hospital ID
          <input
            type="number"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
          />
        </label>
        <label>
          Medical Speciality Id
          <input
            type="number"
            value={medicalSpecialityId}
            onChange={(e) => setMedicalSpecialityId(e.target.value)}
          />
        </label>
        <label>
          Medical Education
          <input
            type="text"
            value={medicalEducation}
            onChange={(e) => setMedicalEducation(e.target.value)}
          />
        </label>
        <label>
          Accepts Insurance?
          <input
            type="radio"
            value={acceptsInsurance}
            onChange={(e) => setAcceptsInsurance(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default PhysicianForm;
