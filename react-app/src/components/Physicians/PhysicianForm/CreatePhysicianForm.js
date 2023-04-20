import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import PhysicianForm from ".";
import { createPhysician } from "../../../store/physicians";


const CreatePhysicianForm = () => {

    const physician = {
        firstName: "TEST",
        lastName: "",
        picture: "",
        hospitalId: 1,
        medicalSpecialityId: 1,
        medicalEducation: "",
        acceptsInsurance: true,
    }

    return (
        <PhysicianForm physician={physician} formType="Create Physician" />
    )

}

export default CreatePhysicianForm