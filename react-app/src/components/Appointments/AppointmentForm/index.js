import { useState } from "react"
import { useHistory } from "react-router-dom";



const AppointmentForm = ({ appointment, formType }) => {
    const history = useHistory()
    const [patientId, setPatientId] = useState(appointment.patientId);
    const [physicianId, setPhysicianId] = useState(appointment.physicianId);
    const [hospitalId, setHospitalId] = useState(appointment.hospitalId);
    const [reasonForVisit, setReasonForVisit] = useState(appointment.reasonForVisit);
    const [startTime, setStartTime] = useState(appointment.startTime);
    const [endTime, setEndTime] = useState(appointment.endTime);

    const handleSubmit = () => {

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="appointment-form">
                <h2>{formType}</h2>
                <button type="submit">{formType}</button>
            </form>
        </>

    )
}

export default AppointmentForm