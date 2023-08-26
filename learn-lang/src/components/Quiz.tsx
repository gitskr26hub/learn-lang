import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { saveResult } from "../Redux/Slices";

const Quiz = () => {
const [result,setresult]=useState<string[]>([])

const [count,setCount]=useState<number>(0)

const [ans,setAnswer]=useState<string>("")

const navigate=useNavigate()
const dispatch=useDispatch()


const {loading,words}=useSelector((state:{root:StateType})=>state.root)
// console.log(loading,words)


const nextHandler = ():void =>{

  setresult((prev)=>[...prev,ans])
  setCount((prev)=>prev+1)
  setAnswer('')
}


     useEffect(()=>{
      if(count+1>words.length){navigate('/result')
      }
      dispatch(saveResult(result))
     },[result])





  return (
    <Container maxWidth='sm' sx={{padding:"1rem"}}>
      <Typography m={'2rem 0'} style={{textAlign:'center',fontStyle:"italic",color:"#010821",
    fontSize:"35px",textDecoration:"underline"}}>Quiz</Typography>

      <Typography variant="h3">
        {count+1}-{words[count]?.word}
      </Typography>

      <FormControl>
        <FormLabel sx={{mt:"2rem",mb:"1rem"}}>
          Meaning

        </FormLabel>
        <RadioGroup value={ans}
        onChange={(e)=>setAnswer(e.target.value)}>
           {
          words[count]?.options?.map((option,index)=>{
           return <FormControlLabel
          value={option}
          key={option}
          control={<Radio/>}
          label={option}/>
          })
         }
          

         
        </RadioGroup>
      </FormControl>

      <Button sx={
        {margin:"3rem 0",
   }
    }
    color="error"
   
    variant="contained"
    fullWidth
    onClick={nextHandler}
    disabled={ans===""}
    >
     {count===words?.length-1?"SUBMIT":"NEXT"}
    </Button>


      
    </Container>
  )
}

export default Quiz
