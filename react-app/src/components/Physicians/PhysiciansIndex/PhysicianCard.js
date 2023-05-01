import { useState } from "react"
import OpenModalButton from "../../OpenModalButton"
import DeletePhysicianModal from "../PhysicianModal/DeletePhysicianModal"
import "./PhysiciansIndex.css"
import UpdatePhysicianModal from "../PhysicianModal/UpdatePhysicianModal"
import VideoModal from "../../VideoModal"
import CreateAppointmentModal from "../../Appointments/AppointmentModal/CreateAppointmentModal"
import { useModal } from "../../../context/Modal"



const PhysicianCard = ({ physician }) => {
    const { setModalContent } = useModal();
    const [iconVisibility, setIconVisibility] = useState("hidden-physician-icons")
    const [calendarIcon, setCalendarIcon] = useState("fa-solid")

    return (
        <div
            className="physician-card"
            key={physician.id}
            onMouseOver={() => setIconVisibility("")}
            onMouseLeave={() => setIconVisibility("hidden-physician-icons")}
        >
            <div className="physician-card-header">
                <div className="physician-image-container">
                    <img src={physician.picture}
                    alt="doctor"
                    className="profile-pic"
                    />
                </div>
                <div className="physician-card-icons">
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                        modalComponent={<UpdatePhysicianModal physician={physician} />}
                        className={`physician-card-icon ${iconVisibility}`}
                    />
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-trash-can"></i>}
                        modalComponent={<DeletePhysicianModal physician={physician} />}
                        className={`physician-card-icon ${iconVisibility}`}
                    />
                </div>
            </div>
            <div className="physician-card-content">
                <OpenModalButton 
                    buttonText={<>
                        <i className="fa-solid fa-circle-play"></i>
                        <p>Meet the Doctor</p>
                    </>}
                    modalComponent={<VideoModal video={physician.video}/>}
                    className="physician-card-video"
                />
                <h2>{`${physician.first_name} ${physician.last_name} ${physician.medical_education}`}</h2>
                <h3>{physician.medical_specialty.name}</h3>
                <h4>{physician.hospital.name}</h4>
                {/* UNCOMMENT AND IMPLEMENT FOR GREEN LIGHT */}
                {/* <div className="physician-card-buttons">
                    <i className="fa-solid fa-heart"></i>
                    <button>Add to MyCare team</button>
                </div> */}
                <div
                    className="physician-card-buttons"
                    onClick={() => setModalContent(<CreateAppointmentModal physician={physician}/>)}
                    onMouseEnter={(() => setCalendarIcon("fa-regular"))}
                    onMouseLeave={(() => setCalendarIcon("fa-solid"))}
                >
                    <i className={`${calendarIcon} fa-calendar-check`}></i>
                    <button>Book an Appointment</button>
                </div>
                
            </div>
        </div>
    )
}


export default PhysicianCard