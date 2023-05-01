import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createHospitalThunk, updateHospitalThunk } from "../../../store/hospitals";
import "./HospitalModal.css"

const HospitalForm = ({ hospital, formType }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let id;
    if (hospital.id) id = hospital.id;

    const [name, setName] = useState(hospital.name);
    const [address, setAddress] = useState(hospital.address);
    const [city, setCity] = useState(hospital.city);
    const [state, setState] = useState(hospital.state);
    const [country, setCountry] = useState(hospital.country);
    const [lat, setLat] = useState(hospital.lat);
    const [lng, setLng] = useState(hospital.lng);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hospitalData = {
            id,
            name,
            address,
            city,
            state,
            country,
            lat,
            lng
        };

        if (Object.values(errors).length === 0) {
            if (formType === "Create Hospital") {
                await dispatch(createHospitalThunk(hospitalData))
            };
            if (formType === "Update Hospital") {
                await dispatch(updateHospitalThunk(hospitalData))
            }
            closeModal()
        }
        setHasSubmitted(true);
    }
    return (
        <div className="hospital-modal">
            <h2>{formType}</h2>
            <form onSubmit={handleSubmit} id="hospital-form" className="hospital-form">
                <label>
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.name}</p>)}
                <label>
                    Address
                </label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.address}</p>)}
                <label>
                    City
                </label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.city}</p>)}
                <label>
                    State
                </label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.state}</p>)}
                <label>
                    Country
                </label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.country}</p>)}
                <label>
                    Latitude
                </label>
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.lat}</p>)}
                <label>
                    Longitude
                </label>
                <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.lng}</p>)}
            </form>
            <button
                type="submit"
                form="hospital-form"
                disabled={hasSubmitted && Object.values(errors).length !== 0}
            >{formType}</button>
        </div>
    )
}

export default HospitalForm;