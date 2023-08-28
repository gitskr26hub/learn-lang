import {AppBar,Toolbar,Typography} from "@mui/material"
import { useDispatch } from "react-redux"
import {Link} from "react-router-dom"
import { clearState } from "../Redux/Slices"


const style={
    margin:"0.5rem",
    textDecoration:"none",
    color:"white"
}



const Header = () => {
    const dispatch=useDispatch()
  return (
     <div
      className="box"
     
    >
    <AppBar  position="static" style={{zIndex:"100000",position:"sticky",top:"10px"}}>
        <Toolbar sx={{backgroundColor:"red"}}>
            <Typography variant="h5" mr={'auto'} color="white" fontStyle={'italic'}
            textTransform={"uppercase"}>
                Learn..
            </Typography>
            <Link style={style} to="/" onClick={()=>dispatch(clearState())}>
                Home
            </Link>
        </Toolbar>
      
    </AppBar>
    </div>
  )
}

export default Header
