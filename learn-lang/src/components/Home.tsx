
import {Container,Typography,Stack,Button} from "@mui/material"
import {useNavigate,} from "react-router-dom"
import {useEffect,useState} from "react"

const Languages =[{name:"Japanese",code:"ja"},
{name:"Hindi",code:"hi"},
{name:"Spanish",code:"es"},
{name:"French",code:"fr"}]

const Home = () => {
    const navigate=useNavigate()
    const [screenSize, setScreenSize] = useState<number>(getCurrentDimension());

    const SelectLangauge=(code:string):void => {
    sessionStorage.setItem("language",JSON.Stringiy({"language":`${code}`}))
        navigate(`/learn`)

    }


    function getCurrentDimension():number{
        return window.innerWidth
             }

    useEffect(() => {
        const updateDimension = ():void => {
              setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

    
        return(():void => {
            window.removeEventListener('resize', updateDimension);
        })
  }, [screenSize])


  
  return (
    <Container maxWidth='sm'>
        <Typography variant='h3' p='2rem'
        textAlign='center'>
        Welcome, Begin your journey of learning.
        </Typography>

        <Stack direction={screenSize>640?'row':'column'}

        spacing={'2rem'} p='1rem' alignItems={'center'} justifyContent={'center'}>
           {Languages.map((lang)=>{
           return <Button fullWidth
          
           variant="contained"
           color='info'
           onClick={()=>SelectLangauge(lang.code)} key={lang.code}>{lang.name}

           </Button>}
           )}
        </Stack>
        <Typography textAlign={'center'} color={'red'}>**Choose one language
             from above one
        </Typography>
      
    </Container>
  )
}

export default Home
