import AppointmentsIndex from "../Appointments/AppointmentsIndex"
import PhysiciansIndex from "../Physicians/PhysiciansIndex"
import "./Dashboard.css"

const Dashboard = () => {

    return (
        <>
            <div className="dashboard">
                <div className="side-bar">

                </div>
                <div className="dashboard-content">
                    <PhysiciansIndex />
                    <AppointmentsIndex />
                </div>
            </div>
        </>
    )
}

export default Dashboard