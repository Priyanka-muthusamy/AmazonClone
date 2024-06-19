import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  
  const { id: userId } = useParams();

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector(
    (state) => state.authState
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    dispatch(updateUser(userId, formData))
  }

  useEffect(() => {
    if(isUserUpdated) {
        toast('User Updated Successfully', {
            type: 'success',
            position: 'bottom-center',
            onOpen: () => { dispatch(clearUserUpdated()) } //here we set the isUpdated val as false after the toast message shown so we don't get toast message every time open the updated page after got updated message
        })
        return;
    }   

    if(error) { //here update failed this toast message will appear
        toast(error, {
            position: "bottom-center",
            type: 'error',
            onOpen: () => { dispatch(clearError()) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the updated page after got error message
        })
        return 
    }
    dispatch(getUser(userId)) //here this will dispatch this action so we get the specific product details in the update product id field. so in this it'll pass the product id and get the product data
}, [isUserUpdated, error, dispatch, userId])

//here this is for show the content of the product which we choosed to edit in the update product page
useEffect(() => {
    if(user._id) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }
},[user])

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
              <h1 className="mb-4">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="text"
                  id="email_field"
                  className="form-control"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role_field">Role</label>
                <select disabled={user._id === authUser._id} value={role} onChange={e => setRole(e.target.value)} className="form-control" id="role_field">
                  <option value=''>Select</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>
              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>

    )
}