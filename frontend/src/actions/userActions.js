import {clearError, clearUpdateProfile, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutSuccess, registerFail, registerRequest, registerSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess} from '../slices/authSlice';
import axios from 'axios';
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, userSuccess, usersFail, usersRequest, usersSuccess } from '../slices/userSlice';

//here we create the action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`/api/v1/login`,{email,password}); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(loginSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

//here create action of the clearError() func in the authslice file
export const clearAuthError = dispatch => {
    dispatch(clearError())
}

//here create action for register reducer
export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        //here set content type as 'multipart/form-data' in headers when request sent
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/register`, userData, config); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(registerSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

//here create action for keep user in logged in so you are already logged in then if you try to again login it won't be allow if you click login page it won't go to the login page
export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get(`/api/v1/myprofile`); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(loadUserSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}

//here we create logout action
export const logout = async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(logoutSuccess()) //here we send this data as a payload
    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
    }
}

//we create action for update
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest())
        //here set content type as 'multipart/form-data' in headers when request sent
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/update`, userData, config); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(updateProfileSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}

//here create action of the clearUpdateProfile() func in the authslice file
export const clearAuthUpdateProfile = dispatch => {
    dispatch(clearUpdateProfile())
}

//we create action for update password
export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        await axios.put(`/api/v1/password/change`, formData, config); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(updatePasswordSuccess()) //here we send this data as a payload
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
}

//we create action for forgot password
export const forgotPassword = (formData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/password/forgot`, formData, config); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(forgotPasswordSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}

//we create action for reset password
export const resetPassword = (formData, token) => async (dispatch) => { //here send the token is which user password reset
    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/password/reset/${token}`, formData, config); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(resetPasswordSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}

export const getUsers = async (dispatch) => {
    try {
        dispatch(usersRequest())
        const { data } = await axios.get(`/api/v1/admin/users`); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(usersSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }
}

export const getUser = id => async (dispatch) => {
    try {
        dispatch(userRequest())
        const { data } = await axios.get(`/api/v1/admin/user/${id}`); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(userSuccess(data)) //here we send this data as a payload
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}

export const deleteUser = id => async (dispatch) => {
    try {
        dispatch(deleteUserRequest())
        await axios.delete(`/api/v1/admin/user/${id}`); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(deleteUserSuccess()) //here we send this data as a payload
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }
}

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        await axios.put(`/api/v1/admin/user/${id}`, formData, config); //here we use post method for get user data and store it in db and we extract the data from the axios
        dispatch(updateUserSuccess()) //here we send this data as a payload
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }
}