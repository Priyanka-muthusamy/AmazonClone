import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearAuthError, clearAuthUpdateProfile } from '../../actions/userActions';
import { toast } from 'react-toastify';

export default function UpdateProfile() {
  const { error, user, isUpdated } = useSelector(state => state.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
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
      }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    //FormData Object: Used to create and manage form data for submission
    const formData = new FormData(); //this obj is a js class
    //Appending Data: Use formData.append(key, value) to add form fields
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  }

  useEffect(() => {
    if(user) { //here we set the previous value of the user to the this state values
        setName(user.name);
        setEmail(user.email);
        if(user.avatar) {
            setAvatarPreview(user.avatar);
        }
    }

    if(isUpdated) { //here we set toast message for user profile updated
        toast('Profile Updated Successfully', {
            type: 'success',
            position: 'bottom-center',
            onOpen: () => { dispatch(clearAuthUpdateProfile()) } //here we set the isUpdated val as false after the toast message shown so we don't get toast message every time open the updated page after got updated message
        })
        return;
    }

    if(error) { //here update failed this toast message will appear
        toast(error, {
            position: "bottom-center",
            type: 'error',
            onOpen: () => { dispatch(clearAuthError()) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the updated page after got error message
        })
        return 
    }
  }, [user, isUpdated, error, dispatch])

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
          <h1 className="mt-2 mb-5">Update Profile</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name} //here set the value of the name so this previous value of the name will be appear in the name input field
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeAvatar}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
