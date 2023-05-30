import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createAppointmentThunk, updateAppointmentThunk } from "../../../store/appointments";
import { setHospitalsThunk } from "../../../store/hospitals";
import { setPhysiciansThunk } from "../../../store/physicians";
import DatePicker from "react-datepicker"
import "./AppointmentModal.css"
import "./react-datepicker.css"

const AppointmentForm = ({ appointment, formType }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let appointmentId;
    if (appointment.id) appointmentId = appointment.id;

    const [physicianId, setPhysicianId] = useState(appointment.physician?.id);
    const [hospitalId, setHospitalId] = useState(appointment.hospitalId);
    const [reasonForVisit, setReasonForVisit] = useState(appointment.reasonForVisit);
    const [startDate, setStartDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState(appointment.startTime);
    const [unavailableTimes, setUnavailableTimes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const hospitalsState = useSelector((state) => state.hospitals);
    const physiciansState = useSelector((state) => state.physicians.allPhysicians);
    const physicians = Object.values(physiciansState);
    const physician = physiciansState[physicianId];

    const times = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

    useEffect(() => {
        const errorsObj = {};
        if (physicianId === "") {
            errorsObj.physicianId = "Physician is required";
        };
        if (hospitalId === "") {
            errorsObj.hospitalId = "Hospital is required";
        };
        if (reasonForVisit.trim().length === 0) {
            errorsObj.reasonForVisit = "Cannot only be whitespace";
        };
        if (reasonForVisit === "") {
            errorsObj.reasonForVisit = "Reason for visit is required";
        };
        if (appointmentTime.length === 0) {
            errorsObj.appointmentTime = "Appointment time is required";
        };
        setErrors(errorsObj);
    }, [physicianId, hospitalId, reasonForVisit, appointmentTime, startDate]);

    useEffect(() => {
        dispatch(setHospitalsThunk())
        dispatch(setPhysiciansThunk())
    }, [dispatch])

    useEffect(() => {
        const sameDateCheck = (appointment) => {
            const selectedDate = startDate.toISOString().slice(0, 10);
            const appointmentDate = appointment.start_time.slice(0, 10);

            if (selectedDate === appointmentDate) return true;
            return false;
        }

        const appointments = Object.values(physician?.appointments);
        const timeCheck = new Date(startDate.toISOString().slice(0, 10)) - new Date().getTime()
        let bookedTimes = [];
        let timeOptions = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

        // Voids any past dates
        if (timeCheck < -86400000) {
            bookedTimes = timeOptions;
        }

        // ACT OF GOD INSURANCE: Blocks out random time-slots for current date
        if (timeCheck > -86400000 && timeCheck < 0) {
            let num = (physician.first_name.charCodeAt(0) + physician.last_name.charCodeAt(0)) % timeOptions.length;
            while (num >= 0) {
                bookedTimes.push(timeOptions[num]);
                num = Math.floor(num / 2) - 1;
            }
        }

        if (appointments.length) {
            physician.appointments.forEach((appointment) => {
                if (sameDateCheck(appointment)) {
                    const hour = appointment.start_time[11] === "0" ? appointment.start_time.slice(12, 13) : appointment.start_time.slice(11, 13);
                    const time = `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "PM" : "AM"}`;
                    bookedTimes.push(time);
                };
            });
        };

        setUnavailableTimes(bookedTimes);

    }, [physician, startDate]);

    if (!hospitalsState) return <h1>Loading...</h1>;
    if (!physiciansState) return <h1>Loading...</h1>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const month = startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;
        const day = startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate();
        const hour = () => {
            if (appointmentTime.length === 3) {
                if (appointmentTime.slice(1) === "PM") {
                    const num = Number(appointmentTime.slice(0, 1));
                    return String(num + 12);
                } else {
                    return `0${appointmentTime.slice(0, 1)}`
                };
            };
            if (appointmentTime.length === 4) {
                return appointmentTime.slice(0, 2);
            };
        };
        const date = `${startDate.getFullYear()}-${month}-${day}T${hour()}:00`;

        console.log(startDate.toISOString().slice(0,16))
        console.log(date)

        const appointmentData = {
            id: appointmentId,
            physician_id: physicianId,
            hospital_id: hospitalId,
            reason_for_visit: reasonForVisit,
            start_time: date,
            end_time: date
        };

        if (Object.values(errors).length === 0) {
            if (formType === "Book") {
                await dispatch(createAppointmentThunk(appointmentData))
            };
            if (formType === "Update") {
                await dispatch(updateAppointmentThunk(appointmentData))
            };
            closeModal()
        }
        setHasSubmitted(true);
    };

    const appointmentCheck = (time) => {
        if (appointmentTime === time) return "appointment-time selected-time";
        if (unavailableTimes.includes(time)) return "disabled-time"
        else return "appointment-time";
    }

    return (
        <div className="appointment-form-modal">
            <h2>{`${formType} Your Appointment`}</h2>
            <div className="appointment-form-container">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                        setAppointmentTime("")
                        setStartDate(date)
                        setErrors({})
                        setHasSubmitted(false)
                    }}
                    inline
                />
                <form onSubmit={handleSubmit} className="appointment-form" id="appointment-form">
                    <label>
                        Physician
                    </label>
                    <select
                        value={physicianId}
                        onChange={e => {
                            setHospitalId(physiciansState[e.target.value]?.hospital.id || "")
                            setPhysicianId(e.target.value)
                        }
                        }>
                        <option value="">Select an Option</option>
                        {physicians.map((physician) => (
                            <option value={physician.id} key={physician.id}>
                                {`${physician.first_name} ${physician.last_name}`}
                            </option>
                        ))}
                    </select>
                    {hasSubmitted && (<p className="error">{errors.physicianId}</p>)}
                    {hasSubmitted && (<p className="error">{errors.hospitalId}</p>)}
                    <label>
                        Reason For Visit
                    </label>
                    <textarea
                        value={reasonForVisit}
                        onChange={(e) => setReasonForVisit(e.target.value)}
                        rows="5" cols="33"
                    >
                    </textarea>
                    {hasSubmitted && (<p className="error">{errors.reasonForVisit}</p>)}
                </form>
            </div>
            <label>
                Appointment Time
            </label>
            <div className="appointment-times-grid">
                {times.map((time) => (
                    <div
                        onClick={() => {
                            if (appointmentCheck(time) !== "disabled-time") setAppointmentTime(time)
                        }}
                        className={appointmentCheck(time)}
                    >
                        <h2>{time}</h2>
                    </div>
                )
                )}
            </div>
            {hasSubmitted && (<p className="error">{errors.appointmentTime}</p>)}
            <button
                type="submit"
                form="appointment-form"
                disabled={hasSubmitted && Object.values(errors).length !== 0}
                className="appointment-submit-button"
            >{`${formType} Appointment`}</button>
        </div>
    )
}

export default AppointmentForm