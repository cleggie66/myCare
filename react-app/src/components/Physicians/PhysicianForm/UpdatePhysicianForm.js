import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import PhysicianForm from ".";


const UpdatePhysicianForm = () => {
    const dispatch = useDispatch();

    const physiciansState = useSelector(state => state.physicians.allPhysicians)
    console.log(physiciansState)
    const physician = physiciansState[0]

    return (
        <PhysicianForm physician={physician} formType="Update Physician" />
    )

}

export default UpdatePhysicianForm