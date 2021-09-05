import React,{useEffect, useContext} from 'react'
import './Topbar.css'
import { UserContext } from '../../context/UserContext'
import * as userApi from '../../api/UserApi'
import { useHistory } from 'react-router-dom'
export default function Topbar() {

    const [state,setState] = useContext(UserContext)
    const history = useHistory()
    useEffect(async()=>{
        try {
            const data = await userApi.getUser()
            await setState({user:data})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    },[])
    const logout = ()=>{
        window.localStorage.removeItem('jwt')
        setState({})
    }
    return (
        <div className="topbar d-flex justify-content-between align-content-center">
            <div className="topbar__contact d-flex justify-content-around">
                <p><i className="fas fa-envelope"></i> <span>hongquan080799@gmail.com</span></p>
                <p><i className="fas fa-phone"></i> <span>Hotline: 0336781801</span></p>
            </div>
            <div className="topbar__utils d-flex justify-content-around">
                {state?.user != null?
                    <p><i class="fas fa-user"></i> <span>{state?.user?.displayname}</span></p> :
                    <p onClick={()=> history.push('/login')}><i className="fas fa-sign-in-alt" ></i> <span>Login</span></p>
                }
                <p><i className="fas fa-bell"></i> <span>Notification</span></p>
                {state?.user != null?
                    <p onClick={logout}><i className="fas fa-sign-in-alt" ></i> <span>Logout</span></p>:''
                }
            </div>
        </div>
    )
}
