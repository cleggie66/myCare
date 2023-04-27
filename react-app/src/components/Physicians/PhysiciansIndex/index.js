import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllPhysiciansThunk } from "../../../store/physicians"
import { useHistory } from "react-router-dom"
import "./PhysiciansIndex.css"
import PhysicianCard from "./PhysicianCard"


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
            <div className="physician-cards-index">
                {physicians.map((physician) => {
                    return <PhysicianCard physician={physician} />
                })}
            </div>
            <button
                onClick={() => history.push("/physician/new")}
            >
                Add Physician
            </button>
        </>
    )
}

export default PhysiciansIndex