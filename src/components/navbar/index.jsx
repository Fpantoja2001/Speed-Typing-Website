import './index.scss'
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <div className='wrapperNavbar'>
           <div className='containerNavbar'>
                
                {/* Code for title display */}
                
                <Link to='/' className='title'>
                    <h1>Speedtyping.</h1><span>io</span>
                </Link>
                
                {/* Code for login button */}
                
                <div className='login'>
                    <div className='loginButton'>
                        <span id='loginText'>Login <span id='slash'>/</span> Signup</span>
                        <LoginIcon id='lb'></LoginIcon>
                    </div>
                </div>
            </div> 
        </div>
        
    )
}