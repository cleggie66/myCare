const normalizer = (arr) => {
    const obj = {};
    arr?.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const CREATE_HOSPITAL = "hospitals/CREATE_HOSPITAL";
const SET_HOSPITALS = "hospitals/SET_HOSPITALS";
const UPDATE_HOSPITAL = "hospitals/UPDATE_HOSPITAL";
const DELETE_HOSPITAL = "hospitals/DELETE_HOSPITAL";

// ACTIONS
export const createHospital = (hospital) => {
    return {
        type: CREATE_HOSPITAL,
        hospital
    }
};
export const setHospitals = (hospitals) => {
    return {
        type: SET_HOSPITALS,
        hospitals
    }
};
export const updateHospital = (hospital) => {
    return {
        type: UPDATE_HOSPITAL,
        hospital
    }
};
export const deleteHospital = (hospital) => {
    return {
        type: DELETE_HOSPITAL,
        hospital
    }
};

// THUNKS
export const createHospitalThunk = (hospitalData) => async (dispatch) => {
    try {
        const response = await fetch("/api/hospitals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hospitalData)
        })
        const hospital = await response.json()
        dispatch(createHospital(hospital))
        return hospital
    } catch (error) {
        console.log(error)
    }
};
export const setHospitalsThunk = () => async (dispatch) => {
    const response = await fetch("/api/hospitals");
    const data = await response.json();
    const hospitals = normalizer(data.hospitals);
    dispatch(setHospitals(hospitals));
    return hospitals;
};
export const updateHospitalThunk = (hospitalData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/hospitals/${hospitalData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hospitalData)
        })
        const hospital = await response.json()
        dispatch(updateHospital(hospital))
        return hospital
    } catch (error) {
        console.log(error)
    }
};
export const deleteHospitalThunk = (hospitalData) => async (dispatch) => {
    const response = await fetch(`/api/hospitals/${hospitalData.id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteHospital(hospitalData))
    }
    return response
};

//REDUCER
export default function reducer(state = {}, action) {
    switch (action.type) {
        case CREATE_HOSPITAL:
            return { ...state, [action.hospital.id]: action.hospital };
        case SET_HOSPITALS:
            return action.hospitals
        case UPDATE_HOSPITAL:
            return { ...state, [action.hospital.id]: action.hospital };
        case DELETE_HOSPITAL:
            let newState = { ...state }
            delete newState[action.hospital.id]
            return newState
        default:
            return state
    }
}
