import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography
} from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearState } from "../Redux/Slices";


const Result = () => {
  const [check,setCheck]=useState<number>(0)
  const {result,words}=useSelector((state:{root:StateType})=>state.root)
  //  console.log(result,"words",words)

  const PassingMarks:number=5
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    let correct=0
   for(let i=0;i<result.length;i++){
    if(result[i]==words[i].meaning)correct++
   }
   setCheck(correct)

  },[])


function handleClear():void{
  dispatch(clearState())
  navigate("/")
}


  return (
    <Container maxWidth='sm'  >
      <h1 style={{color:"blue",fontStyle:"italic",textAlign:"center"}}>
        Result
      </h1>
      <h1 style={{color:"indigo",fontStyle:"italic",textAlign:"center"}}>
      You Got {check} right out of {words?.length} .
      </h1>

      <Stack direction={'row'}
 justifyContent={'space-evenly'}>
  <Stack>
    <Typography m='1rem 0' variant="h5">
      Your Ans
    </Typography>
    <List>
      {result?.map((i,ind)=>(
        <ListItem key={ind}>
          {ind+1}-{i}
        </ListItem>
      ))}
    </List>
  </Stack>
  <Stack>
    <Typography m='1rem 0' variant="h5">
     Correct Ans
    </Typography>
    <List>
      {words?.map((i,ind)=>(
        <ListItem key={i.meaning}>
          {ind+1}-{i.word}-{i.meaning}
        </ListItem>
      ))}
    </List>
  </Stack>
 </Stack>
{
  result?.length>0 &&
 <h1 style={{color:check>=PassingMarks?"green":"red",textAlign:"center"}} >{"Passed"||"Fail"}</h1>}

<Typography align='center'>
<Button fullWidth onClick={handleClear} variant="contained" color="error" 
sx={{fontSize:"bold",letterSpacing:"1px"}}>Reset</Button>

</Typography>


    </Container>
  )
}

export default Result
