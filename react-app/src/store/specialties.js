const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const CREATE_SPECIALTY = "specialties/CREATE_SPECIALTY";
const SET_SPECIALTIES = "specialties/SET_SPECIALTIES";
const UPDATE_SPECIALTY = "specialties/UPDATE_SPECIALTY";
const DELETE_SPECIALTY = "specialties/DELETE_SPECIALTY";

// ACTIONS
export const createSpecialty = (specialty) => {
    return {
        type: CREATE_SPECIALTY,
        specialty
    }
};
export const setSpecialties = (specialties) => {
    return {
        type: SET_SPECIALTIES,
        specialties
    }
};
export const updateSpecialty = (specialty) => {
    return {
        type: UPDATE_SPECIALTY,
        specialty
    }
};
export const deleteSpecialty = (specialty) => {
    return {
        type: DELETE_SPECIALTY,
        specialty
    }
};

// THUNKS
export const createSpecialtyThunk = (specialtyData) => async (dispatch) => {
    try {
        const response = await fetch("/api/specialties", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(specialtyData)
        })
        const specialty = await response.json()
        dispatch(createSpecialty(specialty))
        return specialty
    } catch (error) {
        console.log(error)
    }
};
export const setSpecialtiesThunk = () => async (dispatch) => {
    const response = await fetch("/api/specialties");
    const data = await response.json();
    const specialties = normalizer(data.specialties);
    dispatch(setSpecialties(specialties));
    return specialties;
};
export const updateSpecialtyThunk = (specialtyData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/specialties/${specialtyData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(specialtyData)
        })
        const specialty = await response.json()
        dispatch(updateSpecialty(specialty))
        return specialty
    } catch (error) {
        console.log(error)
    }
};
export const deleteSpecialtyThunk = (specialtyData) => async (dispatch) => {
    const response = await fetch(`/api/specialties/${specialtyData.id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteSpecialty(specialtyData))
    }
    return response
};

//REDUCER
export default function reducer(state = {}, action) {
    switch (action.type) {
        case CREATE_SPECIALTY:
            return { ...state, [action.specialty.id]: action.specialty };
        case SET_SPECIALTIES:
            return action.specialties
        case UPDATE_SPECIALTY:
            return { ...state, [action.specialty.id]: action.specialty };
        case DELETE_SPECIALTY:
            let newState = { ...state }
            delete newState[action.specialty.id]
            return newState
        default:
            return state
    }
}
