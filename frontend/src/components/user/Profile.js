import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {

  const { user } = useSelector(state => state.authState);

  return (
    <div className="row justify-content-around mt-5 user-info">
      <div className="col-12 col-md-3">
        <figure className="avatar avatar-profile">
          <img
            className="rounded-circle img-fluid"
            src={user.avatar??'./images/default_avatar.png'} //null coalescing operator(??)
            alt=""
          />
        </figure>
        <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
          Edit Profile
        </Link>
      </div>

      <div className="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{user.name}</p>

        <h4>Email Address</h4>
        <p>{user.email}</p>

        {/* The code String(user.createdAt).substring(0, 10) converts the createdAt property of the user object to a string and then extracts the first 10 characters of that string. This is commonly used to format dates by extracting the date part from a longer timestamp. */}
        <h4>Joined</h4>
        <p>{String(user.createdAt).substring(0, 10)}</p> {/* here using this to get the joined date (0-10 index) */}

        <Link to={'/orders'} className="btn btn-danger btn-block mt-5">
          My Orders
        </Link>

        <Link to='/myprofile/update/password' className="btn btn-primary btn-block mt-3">
          Change Password
        </Link>
      </div>
    </div>
  );
}
