import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import PhysicianForm from ".";
import { createPhysician } from "../../../store/physicians";


const CreatePhysicianForm = () => {

    const physician = {
        firstName: "",
        lastName: "",
        picture: "",
        hospitalId: 1,
        medicalSpecialityId: 1,
        medicalEducation: "",
        acceptsInsurance: true,
    }
    // const physician = {
    //     firstName: "Dr.",
    //     lastName: "Rumack",
    //     picture: "https://www.gannett-cdn.com/presto/2020/07/24/PMJS/642959ad-4518-4464-90f8-6a3a5793c6c5-Nielsen.jpg?width=660&height=372&fit=crop&format=pjpg&auto=webp",
    //     hospitalId: 3,
    //     medicalSpecialityId: 3,
    //     medicalEducation: "PhD",
    //     acceptsInsurance: true,
    // }

    return (
        <PhysicianForm physician={physician} formType="Create Physician" />
    )

}

export default CreatePhysicianForm