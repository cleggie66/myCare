import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createSpecialtyThunk, updateSpecialtyThunk } from "../../../store/specialties";
import "./SpecialtyModal.css"

const SpecialtyForm = ({ specialty, formType }) => {
    const dispatch = useDispatch();
    let id;
    if (specialty.id) id = specialty.id;

    const [name, setName] = useState(specialty.name);
    const [description, setDescription] = useState(specialty.description);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const specialtyData = {
            id,
            name,
            description
        };

        if (Object.values(errors).length === 0) {
            if (formType === "Create Specialty") {
                await dispatch(createSpecialtyThunk(specialtyData))
            };
            if (formType === "Update Specialty") {
                await dispatch(updateSpecialtyThunk(specialtyData))
            }
            closeModal()
        }
        setHasSubmitted(true);
    }
    return (
        <div className="specialty-modal">
            <h2>{formType}</h2>
            <form onSubmit={handleSubmit} id="specialty-form" className="specialty-form">
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
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5" cols="33"
                >
                </textarea>
                {hasSubmitted && (<p className="error">{errors.description}</p>)}
            </form>
            <button
                type="submit"
                form="specialty-form"
                disabled={hasSubmitted && Object.values(errors).length !== 0}
            >{formType}</button>
        </div>
    )
}

export default SpecialtyForm;