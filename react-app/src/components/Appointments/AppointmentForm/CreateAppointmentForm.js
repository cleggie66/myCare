import AppointmentForm from "."



const CreateAppointmentForm = () => {

    const appointment = {
        physicianId: 0,
        hospitalId: 0,
        reasonForVisit: "",
        startTime: "2019-05-15 17:08:11",
        endTime: "2019-05-15 17:08:11",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Create Appointment" />
    )
}

export default CreateAppointmentForm