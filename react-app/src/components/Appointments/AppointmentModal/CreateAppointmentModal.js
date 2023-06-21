import AppointmentForm from "."

const CreateAppointmentModal = ({ physician }) => {

    const appointment = {
        physicianId: physician.id || null,
        hospitalId: physician?.hospital.id || "",
        reasonForVisit: "",
        startTime: "",
        endTime: "",
    };

    return (
        <AppointmentForm appointment={appointment} formType="Book" />
    );
};

export default CreateAppointmentModal