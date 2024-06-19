import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function UpdatePassword() {

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector(state => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('password', password);
    dispatch(updatePasswordAction(formData))
  }

  useEffect(() => {
    if(isUpdated) { //here we set toast message for user profile updated
        toast('Password Updated Successfully', {
            type: 'success',
            position: 'bottom-center'
        })
        setOldPassword(""); //here set password field empty after password updated 
        setPassword("");

        return;
    }

    if(error) { //here update failed this toast message will appear
        toast(error, {
            position: "bottom-center",
            type: 'error',
            onOpen: () => { dispatch(clearAuthError) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the login page after got error message
        })
        return 
    }
  }, [isUpdated, error, dispatch])

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
