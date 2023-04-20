import './index.scss'
import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <div className='navbar'>
            <div className='title'>
                <h1>Speedtyping.io</h1>
            </div>
            <div className='menu'>
                <ul>
                    <li>
                        <Link className='navHome' to='/'>Home</Link>
                    </li>
                    <li id='gSelect'>
                        Game Mode
                    </li>
                    <li id='createBtn'>
                        Create Account
                    </li>
                    <li id='loginBtn'>
                        Login
                    </li>
                </ul>
            </div>
        </div>
    )
}