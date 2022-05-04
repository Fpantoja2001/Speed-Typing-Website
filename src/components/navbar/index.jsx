import './index.scss'
import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <div className='navbar'>
            <div className='title'>
                <h1>sType</h1>
            </div>
            <div className='menu'>
                <ul>
                    <li>
                        Modes
                    </li>
                    <li>
                        Account
                    </li>
                    <li>
                        <Link className='navHome' to='/'>Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}