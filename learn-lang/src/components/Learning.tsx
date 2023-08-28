import { useEffect, useState,useRef } from "react"
import {Container,Button,Typography,Stack} from "@mui/material"
import {useDispatch,useSelector} from "react-redux"

import {useNavigate} from "react-router-dom"
import { ArrowBack,VolumeUp } from "@mui/icons-material"
import { getAudioMsg, translateWords } from "../utils/features"
import { clearState, getWordsSuccess, getWordsfail, getWordsrequest } from "../Redux/Slices"
import Loader from "./Loader"

const Learning = () => {
    const [count,setCount]=useState<number>(0)
    const [Audiosec,setAudiosec]=useState<string>('')
    const dispatch=useDispatch()
    const params=JSON.parse(sessionStorage.getItem("language")!).language as LangType
    // console.log("🚀 ~ file: Learning.tsx:9 ~ Learning ~ params:", params)
    // // [0].get("language") as LangType
    const navigate=useNavigate()
     const audioRef=useRef(null)
    

    function nextHandler():void{
        setCount(prev=>prev+1)
        setAudiosec('')
    }

    const {loading,error}=useSelector((state:{root:StateType})=>state.root)
    const words=JSON.parse(sessionStorage.getItem("words")!)||[]
    //   console.log(loading,result,words)

    useEffect(()=>{
       if(words?.length==0){
        dispatch(getWordsrequest())
        translateWords(params||"hi").then((res)=>{
            //  console.log("res",res)
            dispatch(getWordsSuccess(res))

        }).catch((err)=>{
            dispatch(getWordsfail(err))
            // console.log(err)
          
        })
       }
        if(error){
            alert(error)
            dispatch(clearState())
            if(words.length==0)navigate("/")
        }

    },[])


   async function PlaySoundHere(){

    const audioPlayer:HTMLAudioElement=audioRef.current!
    if(audioPlayer){
        audioPlayer.play()
    }else{

       
        const data=   await  getAudioMsg(words[count]?.word,params)
        //    new Audio(data).play()
        //    console.log("🚀 ~ file: Learning.tsx:49 ~ PlaySoundHere ~ data:", data.length)
           
             setAudiosec(data)
    }
    
      
    }


      if(loading|| words.length==0)return <Loader/>

  return (
    <Container maxWidth='sm' sx={{padding:"1rem"}}>
        <Button onClick={count===0?()=>{
            navigate("/")
        }:()=>setCount(prev=>prev-1)}>
        <ArrowBack/>
        </Button>
        <Typography m='2rem 0' style={{fontStyle:"oblique",padding:"1%",backgroundColor:"yellow"}}>
            Learning Made Easy
        </Typography>
      
<Stack direction={'row'} spacing={'1rem'}>
    <Typography variant="h3">
        {count+1}-{words[count]?.word}
    </Typography>
    <Typography color={'blue'} variant="h3">
        :{words[count]?.meaning}
    </Typography>
    <Button sx={
        {borderRadius:"50%",color:"green"}
    } onClick={ PlaySoundHere}>
        <VolumeUp/>
    </Button>
    {Audiosec && <audio  autoPlay src={Audiosec} ref={audioRef}></audio>}
</Stack>

<Button sx={
        {margin:"3rem 0",fontSize:"20px",letterSpacing:"0.5rem"
   }

   }
    

    color="error"
   
    variant="contained"
    fullWidth
    onClick={()=>count==words?.length-1?navigate("/quiz"):nextHandler()}
    >
     {count==words?.length-1?"TEXT":"NEXT"}
    </Button>



    </Container>
  )
}

export default Learning
