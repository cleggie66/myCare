import { useSelector } from "react-redux";
import AppointmentsIndex from "../Appointments/AppointmentsIndex"
import PhysiciansIndex from "../Physicians/PhysiciansIndex"
import { Redirect } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = () => {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/" />;

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