import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setSpecialtiesThunk } from "../../../store/specialties";
import OpenModalButton from "../../OpenModalButton";
import UpdateSpecialtyModal from "../SpecialtyModal/UpdateSpecialtyModal";
import DeleteSpecialtyModal from "../SpecialtyModal/DeleteSpecialtyModal";
import CreateSpecialtyModal from "../SpecialtyModal/CreateSpecialtyModal";
import "./SpecialtiesIndex.css"

const SpecialtiesIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(setSpecialtiesThunk())
    }, [dispatch])

    const specialtiesState = useSelector(state => state.specialties)
    if (!specialtiesState) return <h1>LOADING...</h1>
    const specialties = Object.values(specialtiesState)

    return (
        <>
            <h2>Specialties</h2>
            <div className="specialties-index">
                {specialties.map((specialty) => {
                    return (
                        <div className="specialty-card" key={specialty.id}>
                            <span>
                                <i class="fa-solid fa-books-medical"></i>
                            </span>
                            <h2>{specialty.name}</h2>
                            <h2>{specialty.description}</h2>
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                modalComponent={<UpdateSpecialtyModal specialty={specialty} />}
                                className="specialty-card-icon"
                            />
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-trash-can"></i>}
                                modalComponent={<DeleteSpecialtyModal specialty={specialty} />}
                                className="specialty-card-icon"
                            />
                        </div>
                    )
                })}
            </div>
            <OpenModalButton
                buttonText="Add Specialty"
                modalComponent={<CreateSpecialtyModal />}
            />
        </>
    )
}

export default SpecialtiesIndex