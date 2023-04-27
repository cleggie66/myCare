import SpecialtyForm from "./SpecialtyForm";

const CreateSpecialtyModal = () => {

    const specialty = {
        name: "",
        description: ""
    };

    return (
        <SpecialtyForm specialty={specialty} formType="Create Specialty" />
    );
}

export default CreateSpecialtyModal