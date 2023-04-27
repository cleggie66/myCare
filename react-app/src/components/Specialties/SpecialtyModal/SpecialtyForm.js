import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createSpecialtyThunk, updateSpecialtyThunk } from "../../../store/specialties";

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
        <>
            <h2>{formType}</h2>
            <form onSubmit={handleSubmit} id="specialty-form">
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
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {hasSubmitted && (<p className="error">{errors.description}</p>)}
            </form>
            <button
                type="submit"
                form="specialty-form"
                disabled={hasSubmitted && Object.values(errors).length !== 0}
            >{formType}</button>
        </>
    )
}

export default SpecialtyForm;