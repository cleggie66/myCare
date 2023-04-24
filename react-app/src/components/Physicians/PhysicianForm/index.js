import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './PhysicianForm.css';
import { createPhysicianThunk, updatePhysicianThunk } from "../../../store/physicians";
import "./PhysicianForm.css"

const PhysicianForm = ({ physician, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let physicianId;
  if (physician.id) physicianId = physician.id;

  const [firstName, setFirstName] = useState(physician.firstName);
  const [lastName, setLastName] = useState(physician.lastName);
  const [picture, setPicture] = useState(physician.picture);
  const [hospitalId, setHospitalId] = useState(physician.hospitalId);
  const [medicalSpecialityId, setMedicalSpecialityId] = useState(physician.medicalSpecialityId);
  const [medicalEducation, setMedicalEducation] = useState(physician.medicalEducation);
  const [acceptsInsurance, setAcceptsInsurance] = useState(physician.acceptsInsurance);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleInputErrors = () => {
    const errorsObj = {};
    if (firstName.length === 0) {
      errorsObj.firstName = "First Name is required";
    }
    if (lastName.length === 0) {
      errorsObj.lastName = "Last Name is required";
    }
    if (medicalEducation.length === 0) {
      errorsObj.medicalEducation = "Medical Education is required";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [firstName, lastName, medicalEducation]);


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

    if (Object.values(errors).length === 0) {

      if (formType === "Create Physician") {
        await dispatch(createPhysicianThunk(physicianData))
      }
  
      if (formType === "Update Physician") {
        await dispatch(updatePhysicianThunk(physicianData))
      }
      
      return history.push("/dashboard");
    }

    setHasSubmitted(true)
  };

  return (
    <div className="physician-form-page">
      <h2>{formType}</h2>
      <div className="physician-form-container">
        <div className="physician-form-preview">
          <div className="image-container">
            <img src={picture} alt="doctor" className="physician-profile-pic" />
          </div>
          <div className="physician-form-preview-details">
            <h2>{firstName}</h2>
            <h2>{lastName}</h2>
            <h2>{medicalEducation}</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="physician-form" id="physician-form">
          <label>
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {hasSubmitted && (<p className="error">{errors.firstName}</p>)}
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
            type="checkbox"
            checked={acceptsInsurance}
            onChange={(e) => setAcceptsInsurance(!acceptsInsurance)}
          />
        </form>
      </div>
      <button
      type="submit"
      form="physician-form"
        disabled={hasSubmitted && Object.values(errors).length !== 0}
      >{formType}</button>
    </div>
  );
}

export default PhysicianForm;
