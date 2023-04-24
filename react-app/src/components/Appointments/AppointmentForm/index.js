import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";



const AppointmentForm = ({ appointment, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let appointmentId;
    if (appointment.id) appointmentId = appointment.id;

    const [patientId, setPatientId] = useState(appointment.patientId);
    const [physicianId, setPhysicianId] = useState(appointment.physicianId);
    const [hospitalId, setHospitalId] = useState(appointment.hospitalId);
    const [reasonForVisit, setReasonForVisit] = useState(appointment.reasonForVisit);
    const [startTime, setStartTime] = useState(appointment.startTime);
    const [endTime, setEndTime] = useState(appointment.endTime);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const appointmentData = {
            id: appointmentId,
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="appointment-form">
                <h2>{formType}</h2>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Physician Id
                </label>
                <input
                    type="text"
                    value={physicianId}
                    onChange={(e) => setPhysicianId(e.target.value)}
                />
                <label>
                    Hospital Id
                </label>
                <input
                    type="text"
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}
                />
                <label>
                    Reason For Visit
                </label>
                <input
                    type="textarea"
                    value={reasonForVisit}
                    onChange={(e) => setReasonForVisit(e.target.value)}
                />
                <label>
                    Start Time
                </label>
                <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <label>
                    End Time
                </label>
                <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <button type="submit">{formType}</button>
            </form>
        </>

    )
}

export default AppointmentForm