import './index.scss'

export default function ReleaseNotes (){
    return (
        <div className='wrapperReleaseNotes'>
            <div className='titleContainer'><span className='title'>Release Notes</span></div>
            <div className='releaseNotesContainer'>
                
                <p>
                    <div className='version'>v1.0 - </div>

                        Hello and Welcome to the very first public production build of 
                    Speed Typing! This build includes a quote game mode with quote length 
                    selection, light mode and dark mode for the website, and live statistic 
                    trackers whilst playing. 
                    <br /><br />
                    Future Features: Account Registration, login support, multipel device support, and top 100 
                    American words game mode.  
                    <br /><br /><br />
                    <span className='date'>08/20/2023</span> 
                </p>
            </div>
        </div>
    )
}