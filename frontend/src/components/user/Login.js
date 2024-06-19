import { Fragment, useEffect, useState } from "react";
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, isAuthenticated } = useSelector(state => state.authState);
  const redirect = location.search?'/'+location.search.split('=')[1]: '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password)) //here this dispatch hook send this action to store
  }

  useEffect(() => {
    if(isAuthenticated) { //here set redirection this login page to home page when the user logged in
        navigate(redirect);
    }

    if(error) { //using this condition for we get the error message in the toast alert
        toast(error, {
            position: "bottom-center",
            type: 'error', //here set toast message box color error
            onOpen: () => { dispatch(clearAuthError) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the login page after got error message
        })
        return 
    }
  },[error, isAuthenticated, dispatch, navigate, redirect]) //here give this error in this dependency for when we get the error message it'll execute

  return (
    <Fragment>
      <MetaData title={`Login`} />{" "}
      {/* here set the title of this page using metadata component */}
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">
              forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading} //here using this loading for disable the login btn when the request send because that time loading is true
            >
              LOGIN
            </button>

            <Link to='/register' className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
