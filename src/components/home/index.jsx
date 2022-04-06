import './index.scss'
import { Link } from 'react-router-dom'

export default function Home () { 

    return (

        <div className='home'>

                <div className='title'>sType</div>

                <div className='modeSelection'>
                    <button className='practice'>
                        <Link to='/practice' > practice</Link>
                    </button>
                    <button className='versus'>versus</button>
                </div>

                <div className='demo'>ll</div>
        </div>

    )

}