import HospitalForm from "./HospitalForm"

const UpdateHospitalModal = ({ hospital }) => {

    const convHospital = {
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        city: hospital.city,
        state: hospital.state,
        country: hospital.country,
        lat: hospital.lat,
        lng: hospital.lng,
        mapPicture: hospital.map_picture,
        websiteUrl: hospital.website_url
    }

    return (
        <HospitalForm hospital={convHospital} formType="Update Hospital" />
    )
}

export default UpdateHospitalModal