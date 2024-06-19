import { useSelector } from "react-redux";
import {Navigate} from 'react-router-dom';
import Loader from '../layouts/Loader';

//this component for the user logged in the profile page will open otherwise it will navigate to login page
export default function ProtectedRoute({children, isAdmin}) { //here this component is a parent component of the profile component and it's have child elements so here we give the children elements as a property
    const { isAuthenticated, loading, user } = useSelector(state => state.authState);

    if(!isAuthenticated && !loading) { //here set condition if the user didn't login and page didn't loading this login page will be open
        return <Navigate to='/login' />
    }

    if(isAuthenticated) { //here set if user logged in profile page will shown
        if(isAdmin === true && user.role !== 'admin') { //here set cond for when the user access admin dashboard page using url directly this cond will execute so user naviagte(return) to home page
            return <Navigate to='/' />
        }
        return children; //here in this children property we have all logged in profile data's so it'll show in the profile page
    }

    if(loading) { //here set if loading is true then loader will show
        return <Loader />
    }
}