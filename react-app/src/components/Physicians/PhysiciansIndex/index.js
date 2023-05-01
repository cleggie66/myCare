import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPhysiciansThunk } from "../../../store/physicians"
import PhysicianCard from "./PhysicianCard"
import OpenModalButton from "../../OpenModalButton"
import CreatePhysicianModal from "../PhysicianModal/CreatePhysicianModal"
import "./PhysiciansIndex.css"


const PhysiciansIndex = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPhysiciansThunk())
    }, [dispatch])

    const physiciansState = useSelector(state => state.physicians.allPhysicians)
    if (!physiciansState) return <h1>LOADING...</h1>
    const physicians = Object.values(physiciansState)

    return (
        <>
            <div className="physician-cards-index">
                {physicians.map((physician) => {
                    return <PhysicianCard physician={physician} />
                })}
            </div>
            <OpenModalButton
                buttonText="Add Physician"
                modalComponent={<CreatePhysicianModal />}
                className="add-physician-button"
            />
            
        </>
    )
}

export default PhysiciansIndex