import './index.scss'
import { useRef } from 'react'

export default function PracticeMode (){


    const referenceText = useRef()   
    
    const timerUpdate = useRef()  

    const inputBox = useRef()

    let wordCount = 0

    const wpm = useRef()

    let start;

    let startCountDown = 6

    const countD = useRef()

    const t = setInterval(() => {

        startCountDown = startCountDown - 1
        countD.current.innerText = `Count Down: ${startCountDown}`

        if (startCountDown === 0){
            gameStart()
        }
    }, 1000);
    

    

    window.onload = t
    

    function gameStart(){

        clearInterval(t)
        inputBox.current.removeAttribute('disabled') 
        inputBox.current.focus()
        timer()
        format()
        console.log('start')

        
    }


    // checks to make sure text matches
    
    function format (event){

        const word = referenceText.current.textContent.split(' ')

        const letters = word[wordCount].concat(' ')

        event.target.setAttribute('maxLength',letters.length)

        if (event.target.value === letters) {
            
            wordCount = wordCount + 1  
            event.target.value = ''
            
        }
        
        if (wordCount === word.length){
            
            console.log('win')
            event.target.setAttribute('disabled',true)

        }

    }

    function timer (){
        start = new Date()

        setInterval(() => {

            timerUpdate.current.innerText =  `Elapsed time: ${timerFormat()}`
            
        }, 1000);
    }

    function timerFormat (){

        return Math.floor((new Date() - start)/1000)

    }

    function cancel (e) {
        console.log('cant use that')
        e.preventDefault()
    }


    return (
        
        <div className='page'>

            <div className='wrapper'>

                <div className='stats' >

                    <div className ='timer' ref={timerUpdate}>Elapsed Time: 0</div>

                    <div className='wpm' ref={wpm}>0</div>

                    <div className='countdown' ref={countD}>Count Down: 6</div>

                    

                </div>

                <p className='reference' ref={referenceText} >
                One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don't throw it away.
                </p>

                
                <input type="text" className='typingBox' onInput={format} ref={inputBox} disabled={true} onPaste={cancel}/>
                

                

            </div>
            
            

        </div>
    )

}