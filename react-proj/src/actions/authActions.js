import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";
import { propTypes } from "react-bootstrap/esm/Image";


// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/register", userData)
        .then(res => history.push("/Dashboard")) // re-direct to Homepage on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register Organization
export const registerOrg = (orgData, history) => dispatch => {
    axios
        .post("/api/registerOrg", orgData)
        .then(res => history.push("/Dashboard")) // re-direct to Homepage on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Student Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("Type", "Student");
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Organization Login - get user token
export const loginOrg = orgData => dispatch => {
    axios
        .post("/api/loginOrg", orgData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("Type", "Organization");
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Student Update - Update the current user
export const updateUser = (userData, history) => dispatch => {
    axios
        .post("/api/updateUser", userData)
        .then(res => history.push("/Dashboard")) // re-direct to Homepage on successful update
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Organization Update - Update the current orgr
export const updateOrg = (orgData, history) => dispatch => {
    axios
        .post("/api/updateOrg", orgData)
        .then(res => history.push("/Dashboard")) // re-direct to Homepage on successful update
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}


// Set logged in user
export const setCurrentUser = decoded => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {}
    dispatch(setCurrentUser({}));
    //set isAuthenticated to false

};
