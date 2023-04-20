import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './PhysicianForm.css';
import { createPhysicianThunk, updatePhysician, updatePhysicianThunk } from "../../../store/physicians";

function PhysicianForm({ physician, formType }) {
  const dispatch = useDispatch();
  const history = useHistory()
  let physicianId;
  if (physician.id) physicianId = physician.id
  const [firstName, setFirstName] = useState(physician.firstName);
  const [lastName, setLastName] = useState(physician.lastName);
  const [picture, setPicture] = useState(physician.picture);
  const [hospitalId, setHospitalId] = useState(physician.hospitalId);
  const [medicalSpecialityId, setMedicalSpecialityId] = useState(physician.medicalSpecialityId);
  const [medicalEducation, setMedicalEducation] = useState(physician.medicalEducation);
  const [acceptsInsurance, setAcceptsInsurance] = useState(physician.acceptsInsurance);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const physicianData = {
      id: physicianId,
      first_name: firstName,
      last_name: lastName,
      picture: picture,
      hospital_id: hospitalId,
      medical_speciality_id: medicalSpecialityId,
      medical_education: medicalEducation,
      accepts_insurance: acceptsInsurance
    }

    if (formType === "Create Physician") {
      await dispatch(createPhysicianThunk(physicianData))
    }

    if (formType === "Update Physician") {
      await dispatch(updatePhysicianThunk(physicianData))
    }

    return history.push("/");
  
  };

  return (
    <>
      <h1>{formType}</h1>
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
        <button type="submit">{formType}</button>
      </form>
    </>
  );
}

export default PhysicianForm;
