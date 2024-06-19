import React from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Dropdown, Image} from 'react-bootstrap';
import {logout} from '../../actions/userActions';

export default function Header() {

  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items:cartItems } = useSelector(state => state.cartState); //here set { items:cartItems } items as cartItems
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //here this callback func for if we click the logout this func will be executed
  const logoutHandler = () => {
    dispatch(logout); //here this dispatch to logout func in action file
  }

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
          <img width="150px" alt='JVLcart Logo' src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        { isAuthenticated ? 
          (
            <Dropdown className='d-inline'>
              <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'> {/* in this variant is background of this toggle so we set default */}
                <figure className='avatar avatar-nav'>
                  <Image width='50px' src={user.avatar??'./images/default_avatar.png'} /> {/* in this we set in the src if avatar is there it'll show otherwise the default icon will show */}
                </figure>
                <span>{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu> {/* here set the menu list of the dropdown */}
                { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('/admin/dashboard')}} className='text-dark'> {/* here set the dropdown list item */}
                  Dashboard
                </Dropdown.Item> }
                <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'> {/* here set the dropdown list item */}
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'> {/* here set the dropdown list item */}
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className='text-danger'> {/* here set the dropdown list item */}
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
         : 
           <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        }
        <Link to='/cart'>
        <span id="cart" className="ml-3">
          Cart
        </span>
        </Link>
        <span className="ml-1" id="cart_count">
          {cartItems.length}
        </span>
      </div>
    </nav>
  );
}
