import './index.scss'

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
                        Home
                    </li>
                </ul>
            </div>
        </div>
    )
}