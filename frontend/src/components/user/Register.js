import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png"); //here set default avatar
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.authState);

  //this func will execute when the user enter the data in the input field
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader(); //here using this for store the choosen file
      reader.onload = () => {
        //after read the file this listener will execuete
        if (reader.readyState === 2) {
          //here when this readyState val is 2 the file reading is done so here check this condition
          setAvatarPreview(reader.result); //here set the choosen files url using result val from the reader
          setAvatar(e.target.files[0]); //here set the choosen file
        }
      };

      reader.readAsDataURL(e.target.files[0]); //this func used to change the file to url
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value }); //here we set the userData values by using name propery in the input field so here which name matches with userData value name that name value stored in userData value field
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //FormData Object: Used to create and manage form data for submission
    const formData = new FormData(); //this obj is a js class
    //Appending Data: Use formData.append(key, value) to add form fields
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if(isAuthenticated) {
        navigate('/');
        return
    }
    if(error) {
        toast(error, {
            position: "bottom-center",
            type: 'error',
            onOpen: () => { dispatch(clearAuthError) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the login page after got error message
        })
        return 
    }
  },[error, isAuthenticated, dispatch, navigate])

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          onSubmit={submitHandler}
          className="shadow-lg"
          encType="multipart/form-data"
        >
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              name="name"
              onChange={onChange}
              type="name"
              id="name_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              name="email"
              onChange={onChange}
              type="email"
              id="email_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              name="password"
              onChange={onChange}
              type="password"
              id="password_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  onChange={onChange}
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading} //here using this loading for disable the register btn when the request send because that time loading is true
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
