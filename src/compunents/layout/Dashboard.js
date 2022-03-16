import Sidebar from "../sidebar/Sidebar"
import Topbar from "../topbar/Topbar"

const Dashboard = ({children}) => {
    return (
        <>
            <Topbar/>
            
            <div className="container">
                <Sidebar/>
                {children}
            </div>
            
        </>
    )
}

export default Dashboard
