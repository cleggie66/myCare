const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const SET_ALL_PHYSICIANS = 'physicians/set_all_physicians'
const SET_SINGLE_PHYSICIAN = 'physicians/set_single_physician'
const CREATE_PHYSICIAN = "physicians/create_physician"
const UPDATE_PHYSICIAN = "physicians/update_physician"
const DELETE_PHYSICIAN = "physicians/delete_physician"

// ACTIONS
export const setAllPhysicians = (physicians) => {
    return {
        type: SET_ALL_PHYSICIANS,
        physicians
    }
}

// THUNKS
export const setAllPhysiciansThunk = () => async (dispatch) => {
    const response = await fetch("/api/physicians")
    const data = await response.json()
    const physicians = normalizer(data.physicians)
    console.log(physicians)
    dispatch(setAllPhysicians(physicians))
    return physicians
}

const initialState = {
    allPhysicians: {},
    activePhysician: {}
}

// REDUCER
export default function reducer(state = {}, action) {
    let newState;
    switch(action.type) {
        case SET_ALL_PHYSICIANS:
            return {
                allPhysicians: action.physicians,
                activePhysician: { ...state.activePhysician }
            }
        default:
            return state
    }
}