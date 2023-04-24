const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const CREATE_PHYSICIAN = "physicians/create_physician";
const SET_ALL_PHYSICIANS = 'physicians/set_all_physicians';
const SET_SINGLE_PHYSICIAN = 'physicians/set_single_physician';
const UPDATE_PHYSICIAN = "physicians/update_physician";
const DELETE_PHYSICIAN = "physicians/delete_physician";

// ACTIONS
export const createPhysician = (physician) => {
    return {
        type: CREATE_PHYSICIAN,
        physician
    };
};
export const setAllPhysicians = (physicians) => {
    return {
        type: SET_ALL_PHYSICIANS,
        physicians
    };
};
export const setSinglePhysician = (physician) => {
    return {
        type: SET_SINGLE_PHYSICIAN,
        physician
    };
};
export const updatePhysician = (physician) => {
    return {
        type: UPDATE_PHYSICIAN,
        physician
    }
};
export const deletePhysician = (physician) => {
    return {
        type: DELETE_PHYSICIAN,
        physician
    }
};

// THUNKS
export const createPhysicianThunk = (physicianData) => async (dispatch) => {
    try {
        console.log("DATA", physicianData)
        console.log("DATA2", JSON.stringify(physicianData))
        const response = await fetch("/api/physicians", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(physicianData)
        })
        const data = await response.json()
        dispatch(createPhysician(data))
        return data
    } catch (error) {
        console.log(error)
    }
};
export const setAllPhysiciansThunk = () => async (dispatch) => {
    const response = await fetch("/api/physicians");
    const data = await response.json();
    const physicians = normalizer(data.physicians);
    dispatch(setAllPhysicians(physicians));
    return physicians;
};
export const updatePhysicianThunk = (physicianData) => async (dispatch) => {
    console.log(physicianData)
    try {
        const response = await fetch(`/api/physicians/${physicianData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(physicianData)
        });
        const data = await response.json();
        dispatch(updatePhysician(data));
        return data;
    } catch (error) {
        console.log(error);
    };
};
export const deletePhysicianThunk = (physicianData) => async (dispatch) => {
    const response = await fetch(`/api/physicians/${physicianData.id}`, {
            method: "DELETE"
        });
    if (response.ok) {
        dispatch(deletePhysician(physicianData))
    }
};


// REDUCER
export default function reducer(state = {}, action) {
    switch (action.type) {
        case CREATE_PHYSICIAN:
            return {
                allPhysicians: { ...state.allPhysicians, [action.physician.id]: action.physician },
                activePhysician: action.physician
            };
        case SET_ALL_PHYSICIANS:
            return {
                allPhysicians: action.physicians,
                activePhysician: { ...state.activePhysician }
            };
        case SET_SINGLE_PHYSICIAN:
            return {
                allPhysicians: { ...state.allPhysicians },
                activePhysician: action.physician
            };
        case UPDATE_PHYSICIAN:
            return {
                allPhysicians: { ...state.allPhysicians, [action.physician.id]: action.physician },
                activePhysician: action.physician
            }
        case DELETE_PHYSICIAN:
            let newState = {
                allPhysicians: { ...state.allPhysicians },
                activePhysician: { ...state.activePhysician }
            }
            delete newState.allPhysicians[action.physician.id]
            return newState
        default:
            return state
    };
};