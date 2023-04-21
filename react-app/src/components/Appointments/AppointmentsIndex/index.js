import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"



const AppointmentsIndex = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // useEffect(() => {
    //     dispatch()
    // })

    return (
        <h2>Appointments</h2>
    )

}

export default AppointmentsIndex