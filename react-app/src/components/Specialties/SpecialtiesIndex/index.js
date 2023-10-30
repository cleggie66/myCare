import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { setSpecialtiesThunk } from "../../../store/specialties";
import OpenModalButton from "../../OpenModalButton";
import UpdateSpecialtyModal from "../SpecialtyModal/UpdateSpecialtyModal";
import DeleteSpecialtyModal from "../SpecialtyModal/DeleteSpecialtyModal";
import CreateSpecialtyModal from "../SpecialtyModal/CreateSpecialtyModal";
import "./SpecialtiesIndex.css"
import ShowSpecialtyModal from "../SpecialtyModal/ShowSpecialtyModal";

const SpecialtiesIndex = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(setSpecialtiesThunk())
    }, [dispatch])

    const specialtiesState = useSelector(state => state.specialties)
    if (!sessionUser) return <Redirect to="/" />
    if (!specialtiesState) return <h1>LOADING...</h1>
    const specialties = Object.values(specialtiesState)

    return (
        <div className="page">
            <div className="specialties-title">
                <i className="fa-solid fa-book-medical"></i>
                <h2>Medical Specialties and Services</h2>
            </div>
            <div className="specialties-index">
                {specialties.map((specialty) => {
                    return (
                        // <ShowSpecialtyModal specialty={specialty} />
                        <div className="specialty-card" key={specialty.id}>
                            <OpenModalButton
                                buttonText={specialty.name}
                                modalComponent={<ShowSpecialtyModal specialty={specialty} />}
                                className="specialty-list-item"
                            />
                        </div>
                    )
                })}
            </div>
            <OpenModalButton
                buttonText="Add A Specialty"
                modalComponent={<CreateSpecialtyModal />}
                className="add-specialty-button"
            />
        </div>
    )
}

export default SpecialtiesIndex