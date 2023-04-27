import { useState } from "react"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import DeletePhysicianModal from "../DeletePhysicianModal"
import "./PhysiciansIndex.css"


const PhysicianCard = ({ physician }) => {
    const history = useHistory();
    const [iconVisibility, setIconVisibility] = useState("hidden-icons")


    return (
        <div
            className="physician-card"
            key={physician.id}
            onMouseOver={() => setIconVisibility("")}
            onMouseLeave={() => setIconVisibility("hidden-icons")}
        >
            <div className="physician-card-content">
                <div className="image-container">
                    <img src={physician.picture} alt="doctor" className="physician-profile-pic" />
                </div>
                <a href={physician.video}>Meet the Doctor</a>
                <h2>{`${physician.first_name} ${physician.last_name} ${physician.medical_education}`}</h2>
                <h3>{physician.medical_specialty.name}</h3>
                <h3>{physician.hospital.name}</h3>
                <div className="physician-card-buttons">
                    <button>Add to MyCare team</button>
                    <button
                    onClick={() => history.push(`/appointment/new/${physician.id}`)}
                    >Book an Appointment</button>
                </div>
            </div>
            <div className="physician-card-icons">
                <div className={`physician-card-icon ${iconVisibility}`}>
                    <i class="fa-solid fa-pen-to-square"
                        onClick={() => history.push(`/physician/${physician.id}/update`)}
                    />
                </div>
                <OpenModalButton
                    buttonText={<i class="fa-solid fa-trash-can"></i>}
                    modalComponent={<DeletePhysicianModal physician={physician} />}
                    className={`physician-card-icon ${iconVisibility}`}
                />
            </div>
        </div>
    )
}


export default PhysicianCard