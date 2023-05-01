import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import PhysicianForm from ".";


const UpdatePhysicianModal = ({ physician }) => {

    const convPhysician = {
        id: physician.id,
        firstName: physician.first_name,
        lastName: physician.last_name,
        picture: physician.picture,
        hospitalId: physician.hospital_id,
        medicalSpecialtyId: physician.medical_specialty_id,
        medicalEducation: physician.medical_education,
        acceptsInsurance: physician.accepts_insurance,
        video: physician.video
    }

    return (
        <PhysicianForm physician={convPhysician} formType="Update Physician" />
    )

}

export default UpdatePhysicianModal