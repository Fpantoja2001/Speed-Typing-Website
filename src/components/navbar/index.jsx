import './index.scss'
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <div className='wrapper'>
           <div className='navbar'>
            <div className='title'>
                <h1>Speedtyping.</h1><span>io</span>
            </div>
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