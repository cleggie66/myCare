import AppointmentForm from "."



const UpdateAppointmentModal = ({ appointment }) => {

    const convAppointment = {
        id: appointment.id,
        physicianId: appointment.physician_id,
        hospitalId: appointment.hospital_id,
        reasonForVisit: appointment.reason_for_visit,
        startTime: appointment.start_time,
        endTime: appointment.end_time
    }

    return (
        <AppointmentForm appointment={convAppointment} formType="Update Appointment" />
    )
}

export default UpdateAppointmentModal