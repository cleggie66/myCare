const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const CREATE_APPOINTMENT = "appointments/CREATE_APPOINTMENT";
const SET_APPOINTMENTS = "appointments/SET_APPOINTMENTS";
const UPDATE_APPOINTMENT = "appointments/UPDATE_APPOINTMENT";
const DELETE_APPOINTMENT = "appointments/DELETE_APPOINTMENT";

// ACTIONS
export const createAppointment = (appointment) => {
    return {
        type: CREATE_APPOINTMENT,
        appointment
    }
};
export const setAppointments = (appointments) => {
    return {
        type: SET_APPOINTMENTS,
        appointments
    }
};
export const updateAppointment = (appointment) => {
    return {
        type: UPDATE_APPOINTMENT,
        appointment
    }
};
export const deleteAppointment = (appointment) => {
    return {
        type: DELETE_APPOINTMENT,
        appointment
    }
};

// THUNKS
export const createAppointmentThunk = (appointmentData) => async (dispatch) => {
    try {
        const response = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData)
        })
        const appointment = await response.json()
        dispatch(createAppointment(appointment))
        return appointment
    } catch (error) {
        console.log(error)
    }
};
export const setAppointmentsThunk = () => async(dispatch) => {
    const response = await fetch("/api/appointments");
    const data = await response.json();
    const appointments = normalizer(data.appointments);
    dispatch(setAppointments(appointments));
    return appointments;
};
export const updateAppointmentThunk = (appointmentData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/appointments/${appointmentData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData)
        })
        const appointment = await response.json()
        dispatch(updateAppointment(appointment))
        return appointment
    } catch (error) {
        console.log(error)
    }
};
export const deleteAppointmentThunk = (appointmentData) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${appointmentData.id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteAppointment(appointmentData))
    }
    return response
    
}

//REDUCER
export default function reducer(state = {}, action) {
    switch (action.type) {
        case CREATE_APPOINTMENT:
            return { ...state, [action.appointment.id]: action.appointment};
        case SET_APPOINTMENTS:
            return action.appointments
        case UPDATE_APPOINTMENT:
            return { ...state, [action.appointment.id]: action.appointment };
        case DELETE_APPOINTMENT:
            let newState = { ...state }
            delete newState[action.appointment.id]
            return newState
        default:
            return state
    }
}
