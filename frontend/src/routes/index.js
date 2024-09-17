import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Register from '../pages/Register'
import LogIn from '../pages/LogIn'
import Home from '../pages/Home'
import Message from '../components/Message'
import AuthLayOut from '../layouts/AuthLayOut'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'register',
                element: <AuthLayOut><Register/></AuthLayOut>
            },
            {
                path:'login',
                element:<AuthLayOut><LogIn/></AuthLayOut>
            },
            {
                path:'',
                element:<Home/>,
                children:[
                    {
                        path:':userId',
                        element:<Message/>
                    }
                ]
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    }

])

export default router