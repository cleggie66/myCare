import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AppointmentsIndex from "../Appointments/AppointmentsIndex"
import PhysiciansIndex from "../Physicians/PhysiciansIndex"
import HospitalsIndex from "../Hospitals/HospitalsIndex";
import SpecialtiesIndex from "../Specialties/SpecialtiesIndex";
import LoadingPage from "../LoadingPage";
import "./Dashboard.css"

const Dashboard = () => {
    const sessionUser = useSelector((state) => state.session.user);

    const [loadingVisibility, setLoadingVisibility] = useState("visible");

    useEffect(() => {
        const loadingPageTimer = setTimeout(() => {
            setLoadingVisibility("hidden");
        }, 3500);
        return () => clearTimeout(loadingPageTimer);
    }, []);

    if (!sessionUser) return <Redirect to="/" />;

    console.log(sessionUser)

    return (
        <>
            <LoadingPage visibility={loadingVisibility} />
            <div className="dashboard">
                <div className="side-bar">
                    <div className="profile-image-container">
                        <img src={sessionUser.profile_picture} alt="doctor" className="user-profile-pic" />
                    </div>
                    <h2>{`${sessionUser.first_name} ${sessionUser.last_name}`}</h2>
                    <h4>Date of Birth:</h4>
                    <h3>{sessionUser.DOB.slice(0, 10)}</h3>
                    <h4>Blood Type:</h4>
                    <h3>{sessionUser.blood_type}</h3>
                </div>
                <div className="dashboard-content">
                    <PhysiciansIndex />
                    <AppointmentsIndex />
                    <HospitalsIndex />
                    <SpecialtiesIndex />
                </div>
            </div>
        </>
    )
}

export default Dashboard