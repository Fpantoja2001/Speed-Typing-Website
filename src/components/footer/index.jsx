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
      <div className='wrapperFooter'>
        <div className='containerFooter'>

            

            <div className='containerRight'>

                {/* Code for footer links */}

                <div className='containerLinks'>
                    <a href="https://github.com/Fpantoja2001/Speed-Typing-Website">
                        <GitHubIcon id='ghi'></GitHubIcon>
                        <div>Github</div>
                    </a>
                    <a href="https://www.linkedin.com/in/felix-manuel-pantoja/">
                        <LinkedInIcon id='lii'></LinkedInIcon>
                        <div>LinkedIn</div>
                    </a>
                    <a href="mailto:fpantoja@umass.edu?subject=Message from Speed Typing Website.">
                        <EmailIcon id='ei'></EmailIcon>
                        <div>Email</div>
                    </a>  
                    <Link id='rn' to={'/releaseNotes'}>
                        <FeedIcon id='fi'></FeedIcon>
                        <div>Release Notes</div>
                    </Link> 
                </div>
            </div>

            

            

            <div className='containerLeft'>

               {/* Code for light / dark mode functionality. Works by changing root color varibles on click.  */} 

               <div id='modeTitle' className='modeTitle'>light mode</div>

               <div className='containerColorMode'>
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
                
                {/* Code for version tag */}
                
                <div className='containerVersionTag'>v1.0</div>
            </div>
        </div>  
      </div>  
      
    )
}