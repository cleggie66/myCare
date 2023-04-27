import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setHospitalsThunk } from "../../../store/hospitals";
import OpenModalButton from "../../OpenModalButton";
import DeleteAppointmentModal from "../../Appointments/DeleteAppointmentModal";

const HospitalsIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(setHospitalsThunk())
    }, [dispatch])

    const hospitalsState = useSelector(state => state.hospitals)
    if (!hospitalsState) return <h1>LOADING...</h1>
    const hospitals = Object.values(hospitalsState)

    return (
        <>
            <h2>Hospitals</h2>
            <div className="hospitals-index">
                {hospitals.map((hospital) => {
                    return (
                        <div className="hospital-card" key={hospital.id}>
                            <span>
                                <i className="fa-sharp fa-solid fa-location-dot"></i>
                            </span>
                            <h2>{hospital.name}</h2>
                            <h2>{hospital.address}</h2>
                            <h2>{hospital.city}</h2>
                            <h2>{hospital.state}</h2>
                            <h2>{hospital.country}</h2>
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-trash-can"></i>}
                                modalComponent={<DeleteAppointmentModal hospital={hospital} />}
                                className="appointment-card-icon"
                            />
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-trash-can"></i>}
                                modalComponent={<DeleteAppointmentModal hospital={hospital} />}
                                className="appointment-card-icon"
                            />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default HospitalsIndex