import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllPhysiciansThunk } from "../../../store/physicians"
import "./PhysiciansIndex.css"
import { Redirect, useHistory } from "react-router-dom"


const PhysiciansIndex = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(setAllPhysiciansThunk())
    }, [dispatch])

    const physiciansState = useSelector(state => state.physicians.allPhysicians)
    if (!physiciansState) return <h1>LOADING...</h1>
    const physicians = Object.values(physiciansState)

    return (
        <>
            <h1>Physicians Index</h1>
            <div className="physician-cards-index">
                {physicians.map((physician) => {
                    return (
                        <div className="physician-card" key={physician.id}>
                            <div className="image-container">
                                <img src={physician.picture} alt="doctor" className="physician-profile-pic" />
                            </div>
                            <h2>{`${physician.first_name} ${physician.last_name} ${physician.medical_education}`}</h2>
                            <h3>{physician.medical_speciality.name}</h3>
                            <h3>{physician.hospital.name}</h3>
                            <div>
                                <button>Add to MyCare team</button>
                                <button>Book an Appointment</button>
                            </div>
                            <div>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button
                onClick={() => history.push("/physician/new")}
            >Add a Physician</button>
        </>
    )
}

export default PhysiciansIndex