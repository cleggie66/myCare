import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { setHospitalsThunk } from "../../../store/hospitals";
import OpenModalButton from "../../OpenModalButton";
import CreateHospitalModal from "../HospitalModal/CreateHospitalModal";
import UpdateHospitalModal from "../HospitalModal/UpdateHospitalModal";
import DeleteHospitalModal from "../HospitalModal/DeleteHospitalModal";
import "./HospitalsIndex.css"

const HospitalsIndex = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(setHospitalsThunk())
    }, [dispatch])

    const hospitalsState = useSelector(state => state.hospitals)
    if (!sessionUser) return <Redirect to="/" />;
    if (!hospitalsState) return <h1>LOADING...</h1>
    const hospitals = Object.values(hospitalsState)

    console.log(hospitals[0])

    return (
        <div className="page">
            <div className="hospitals-index">
                {hospitals.map((hospital) => {
                    return (
                        <div className="hospital-card" key={hospital.id}>
                            <div className="map-preview-container">
                                <img src={hospital.map_picture}
                                    alt="map preview"
                                    className="map-preview"
                                />
                            </div>
                            <div className="hospital-card-details">
                                <div className="hospital-card-title">
                                    <span>
                                        <i className="fa-sharp fa-solid fa-location-dot"></i>
                                    </span>
                                    <h2>{hospital.name}</h2>
                                </div>
                                <div className="hospital-card-address">
                                    <h4>{`${hospital.address}, ${hospital.city}, ${hospital.state}`}</h4>
                                </div>
                                <a
                                    href={hospital.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="hospital-site-button">
                                        Visit Website
                                    </button>
                                </a>
                            </div>
                            <div className="hospital-card-icons">
                                <OpenModalButton
                                    buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                    modalComponent={<UpdateHospitalModal hospital={hospital} />}
                                    className="hospital-card-icon"
                                />
                                <OpenModalButton
                                    buttonText={<i className="fa-solid fa-trash-can"></i>}
                                    modalComponent={<DeleteHospitalModal hospital={hospital} />}
                                    className="hospital-card-icon"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
            <OpenModalButton
                buttonText="Add Hospital"
                modalComponent={<CreateHospitalModal />}
                className="add-hospital-button"
            />
        </div>
    )
}

export default HospitalsIndex