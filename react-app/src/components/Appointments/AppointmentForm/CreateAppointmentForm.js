import AppointmentForm from "."



const CreateAppointmentForm = () => {

    const appointment = {
        physicianId: 0,
        hospitalId: 0,
        reasonForVisit: "",
        startTime: "",
        endTime: "",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Create Appointment" />
    )
}

export default CreateAppointmentForm