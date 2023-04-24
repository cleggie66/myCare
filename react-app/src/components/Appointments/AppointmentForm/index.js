import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAppointmentThunk, updateAppointmentThunk } from "../../../store/appointments";
import "./AppointmentForm.css"



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
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errorsObj = {};
        if (physicianId === 0) {
            errorsObj.physicianId = "Physician is required";
        };
        if (hospitalId === 0) {
            errorsObj.hospitalId = "Hospital is required";
        };
        if (reasonForVisit.length === 0) {
            errorsObj.reasonForVisit = "Reason for visit is required";
        };
        if (startTime.length === 0) {
            errorsObj.startTime = "Start Time is required";
        };
        setErrors(errorsObj);
    }, [physicianId, hospitalId, reasonForVisit, startTime]);

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

        if (Object.values(errors).length === 0) {
            if (formType === "Create Appointment") {
                await dispatch(createAppointmentThunk(appointmentData))
            };
            if (formType === "Update Appointment") {
                await dispatch(updateAppointmentThunk(appointmentData))
            };
            return history.push("/dashboard");
        }
        setHasSubmitted(true);
    };

    return (
        <div className="appointment-form-page">
            <h2>{formType}</h2>
            <div className="appointment-form-container">
                <form onSubmit={handleSubmit} className="appointment-form" id="appointment-form">
                    <label>
                        Physician Id
                    </label>
                    <input
                        type="number"
                        value={physicianId}
                        onChange={(e) => setPhysicianId(e.target.value)}
                    />
                    {hasSubmitted && (<p className="error">{errors.physicianId}</p>)}
                    <label>
                        Hospital Id
                    </label>
                    <input
                        type="number"
                        value={hospitalId}
                        onChange={(e) => setHospitalId(e.target.value)}
                    />
                    {hasSubmitted && (<p className="error">{errors.hospitalId}</p>)}
                    <label>
                        Reason For Visit
                    </label>
                    <input
                        type="textarea"
                        value={reasonForVisit}
                        onChange={(e) => setReasonForVisit(e.target.value)}
                    />
                    {hasSubmitted && (<p className="error">{errors.reasonForVisit}</p>)}
                    <label>
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    {hasSubmitted && (<p className="error">{errors.startTime}</p>)}
                    <label>
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </form>
            </div>
            <button
                type="submit"
                form="appointment-form"
                disabled={hasSubmitted && Object.values(errors).length !== 0}
            >{formType}</button>
        </div>
    )
}

export default AppointmentForm