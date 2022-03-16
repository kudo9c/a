import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../redux/apiCalls"


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector((state) => state.user.currentUser)
    const error = useSelector((state) => state.user.error)
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, {username,password})
        if(!user.isAdmin) {
            error = true
        }
    }

    return (
        <form onSubmit={handleClick} style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",flexDirection:"column",margin:"auto"}}>
            <input style={{padding:10,marginBottom:20}} type="text" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)}></input>
            <input style={{padding:10}} type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}></input>
            {error && <span style={{padding:10,color:"red",fontWeight:"normal"}}>Thông tin không hợp lệ</span>}
            <button type="submit" style={{padding:10,width:100, marginTop:"20px"}}>Login</button>
        </form>
    )
}

export default Login
