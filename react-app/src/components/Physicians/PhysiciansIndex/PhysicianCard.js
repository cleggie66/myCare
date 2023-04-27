import { useState } from "react"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import DeletePhysicianModal from "../DeletePhysicianModal"
import "./PhysiciansIndex.css"


const PhysicianCard = ({ physician }) => {
    const history = useHistory();
    const [iconVisibility, setIconVisibility] = useState("hidden-physician-icons")

    const playVideo = (video) => {

    }

    return (
        <div
            className="physician-card"
            key={physician.id}
            onMouseOver={() => setIconVisibility("")}
            onMouseLeave={() => setIconVisibility("hidden-physician-icons")}
        >
            <div className="physician-card-header">
                <div className="physician-image-container">
                    <img src={physician.picture} alt="doctor" className="profile-pic" />
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
            <div className="physician-card-content">
                <div
                    onClick={playVideo(physician.video)}
                    className="physician-card-video"
                >
                    <i className="fa-solid fa-circle-play"></i>
                    <p>Meet the Doctor</p>
                </div>
                <h2>{`${physician.first_name} ${physician.last_name} ${physician.medical_education}`}</h2>
                <h3>{physician.medical_specialty.name}</h3>
                <h4>{physician.hospital.name}</h4>
                <div className="physician-card-buttons">
                    <i className="fa-solid fa-heart"></i>
                    <button>Add to MyCare team</button>
                </div>
                <div
                    className="physician-card-buttons"
                    onClick={() => history.push(`/appointment/new/${physician.id}`)}
                >
                    <i className="fa-regular fa-calendar-check"></i>
                    <button>Book an Appointment</button>
                </div>
            </div>
        </div>
    )
}


export default PhysicianCard