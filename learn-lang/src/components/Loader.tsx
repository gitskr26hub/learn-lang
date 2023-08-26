
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loader = () => {
  return (
    <Box sx={{ display: 'flex',alignItems:"center",margin:"auto",justifyContent:"center",
    marginTop:"5%",color:"green",fontSize:"40px", }}>
         <CircularProgress />
         <h4 style={{marginLeft:"5px"}}>Loading...!</h4>
   </Box>
  )
}

export default Loader

