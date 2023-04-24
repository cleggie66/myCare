import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './PhysicianForm.css';
import { createPhysicianThunk, updatePhysicianThunk } from "../../../store/physicians";
import "./PhysicianForm.css"

const PhysicianForm = ({ physician, formType }) => {
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

    return history.push("/dashboard");

  };

  return (
    <>
      <form onSubmit={handleSubmit} className="physician-form">
        <h2>{formType}</h2>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>
          Picture URL
        </label>
        <input
          type="text"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
        <label>
          Hospital ID
        </label>
        <input
          type="number"
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
        />
        <label>
          Medical Speciality Id
        </label>
        <input
          type="number"
          value={medicalSpecialityId}
          onChange={(e) => setMedicalSpecialityId(e.target.value)}
        />
        <label>
          Medical Education
        </label>
        <input
          type="text"
          value={medicalEducation}
          onChange={(e) => setMedicalEducation(e.target.value)}
        />
        <label>
          Accepts Insurance?
        </label>
        <input
          type="radio"
          value={acceptsInsurance}
          onChange={(e) => setAcceptsInsurance(e.target.value)}
        />
        <button type="submit">{formType}</button>
      </form>
    </>
  );
}

export default PhysicianForm;
