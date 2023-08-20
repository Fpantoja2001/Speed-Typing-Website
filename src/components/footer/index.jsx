import './index.scss'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from 'react-router-dom';

export default function Footer(){
    

    return (
      <div className='wrapper'>
        <div className='footer'>
            <div className='links'>
                <a href="https://github.com/Fpantoja2001/Speed-Typing-Website"><GitHubIcon id='ghi'></GitHubIcon><span>Github</span></a>
                <a href="https://www.linkedin.com/in/felix-manuel-pantoja/"> <LinkedInIcon id='lii'></LinkedInIcon><span>LinkedIn</span></a>
                <a href="mailto:fpantoja@umass.edu?subject=Message from Speed Typing Website."> <EmailIcon id='ei'></EmailIcon> <span>Email</span></a>  
                <Link id='rn' to={'/releaseNotes'}><FeedIcon id='fi'></FeedIcon><span>Release Notes</span></Link> 
            </div>

            <div className='creatorTag' hidden={true}>By Felix M. Pantoja Tejada</div>

            <div className='colorMode'>
                <span id='modeTitle'>light mode</span>
                <LightModeIcon id='lmi' onClick={() => {
                    document.getElementById('modeTitle').innerText = `Dark Mode`
                    document.getElementById('lmi').setAttribute('hidden', true)
                    document.getElementById('mni').removeAttribute('hidden')
                    document.querySelector(':root').style.setProperty('--bg-color','#FFFFFF')
                    document.querySelector(':root').style.setProperty('--second-text-color','#120E11')
                    if (Number(document.getElementById('cdBox').innerText) > 0) {
                        
                    } else {
                       document.getElementById('quoteBox').style.setProperty('opacity','50%') 
                    }
                    
                    
                }}></LightModeIcon>

                <ModeNightIcon id='mni' hidden={true} onClick={() => {
                    document.getElementById('modeTitle').innerText = `light mode`
                    document.getElementById('mni').setAttribute('hidden', true)
                    document.getElementById('lmi').removeAttribute('hidden')
                    document.querySelector(':root').style.setProperty('--bg-color','#111111')
                    document.querySelector(':root').style.setProperty('--second-text-color','#FFFFFF')

                    if (Number(document.getElementById('cdBox').innerText) > 0) {
                        
                    } else {
                       document.getElementById('quoteBox').style.setProperty('opacity','10%') 
                    }
                }}></ModeNightIcon>
            </div>

            <div className='versionTag'>v1.0</div>
        </div>  
      </div>  
      
    )
}