import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact'; //using this package for material design bootstrap
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const { userOrders = [] } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction);
    },[dispatch])

    //here create data of the table
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order Id", //here create order id col
                    field: 'id', //in this col data is in the id field of db
                    sort: "asc" //order like ascending
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows: []
        }

        //here using this func for this is an array val
        userOrders.forEach(userOrder => { //here using this func to push the userOrders data's into rows data
            data.rows.push({
                id: userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `$${userOrder.totalPrice}`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ? 
                (<p style={{color: 'green'}}>{userOrder.orderStatus}</p>) : 
                (<p style={{color: 'red'}}>{userOrder.orderStatus}</p>),
                actions: <Link to={`/order/${userOrder._id}`} className="btn btn-primary" >
                    <i className='fa fa-eye' ></i>
                </Link>
            })
        });

        return data
    }



    return(
        <Fragment>
            <MetaData title="My Orders" />
            <h1 className='mt-5'>My Orders</h1>
            <MDBDataTable 
                className='px-3'
                bordered
                striped //this is like one row white and one row black order in table 
                hover
                data={setOrders()}
            />
        </Fragment>
    )
}