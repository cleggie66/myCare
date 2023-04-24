import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAppointmentThunk, updateAppointmentThunk } from "../../../store/appointments";



const AppointmentForm = ({ appointment, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let appointmentId;
    if (appointment.id) appointmentId = appointment.id;

    const [physicianId, setPhysicianId] = useState(appointment.physicianId);
    const [hospitalId, setHospitalId] = useState(appointment.hospitalId);
    const [reasonForVisit, setReasonForVisit] = useState(appointment.reasonForVisit);
    const [startTime, setStartTime] = useState(appointment.startTime);
    const [endTime, setEndTime] = useState(appointment.endTime);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const appointmentData = {
            id: appointmentId,
            physician_id: physicianId,
            hospital_id: hospitalId,
            reason_for_visit: reasonForVisit,
            start_time: startTime,
            end_time: endTime
        };

        if (formType === "Create Appointment") {
            await dispatch(createAppointmentThunk(appointmentData))
        };

        if (formType === "Update Appointment") {
            await dispatch(updateAppointmentThunk(appointmentData))
        };

        return history.push("/dashboard");
    };

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
                    type="number"
                    value={physicianId}
                    onChange={(e) => setPhysicianId(e.target.value)}
                />
                <label>
                    Hospital Id
                </label>
                <input
                    type="number"
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