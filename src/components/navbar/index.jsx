import './index.scss'
import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <div className='navbar'>
            <div className='title'>
                <h1>Speedtyping.</h1><span>io</span>
            </div>
            <div className='menu'>
                <ul>
                    <li id='createBtn'>
                        Create Account
                    </li>
                    <li id='loginBtn'>
                        Sign In
                    </li>
                </ul>
            </div>
        </div>
    )
}