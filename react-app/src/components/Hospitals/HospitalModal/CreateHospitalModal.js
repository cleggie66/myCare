import HospitalForm from "./HospitalForm"

const CreateHospitalModal = () => {

    const hospital = {
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        lat: 0,
        lng: 0,
        map_picture: "",
        website_url: ""
    };

    return (
        <HospitalForm hospital={hospital} formType="Create Hospital"/>
    );
}

export default CreateHospitalModal