import './index.scss'
import React, {useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReplayIcon from '@mui/icons-material/Replay';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Landing (){

    const wpm = useRef()
    const countDown = useRef()
    const inputBox = useRef()
    const accuracyField = useRef()
    const cpm =  useRef()
    let toggle = useRef()
    let replayTog = useRef()
    let selectedQuoteLength = useRef()
    let gameStarted = useRef(0)
    // This variable serves to help the Count Down Timer
    let cdsi;
    // 
    let timerEnd;
    // This variable serves to keep track of the word the user is currently supposed to type, had
    // to start at 10 because this program would result in error when switching from double to triple
    // digits
    let wordPOS = 10;
    // This variable helps the elapsed timer function
    let startTime;
    let wperm = 0;
    let cpmCal = 0;
    // These variables serve to keep count of when the user either types a chracter correctly or incorrectly,
    // this is so the users accuracy can be calculated at the end.
    let incorrectCharCount = 0
    let charCount;
    let wordCount;
    // This variable serves to number the divs in which whole words will be split up into indivisual Span tags
    let divIdentifier = 9;
    // This useEffect works to structure the reference text so that I can iterate both through
    // the entire words in it and each character indivisually. I did this so that I can underline the
    // word the user is on and apply either the 'correct' or 'incorrect' css class to each character
    // indivisually to help the user determine when they either type a character correctly or incorrectly.

    // It essentially is taking each word and assigning it a div, and it then takes every chracter of that word 
    // and assigns it its own div

    const [count,setCount] = useState(0)

    async function apiCall (quoteLength) {

        const shortQuote = 'https://api.quotable.io/random?maxLength=100'
        const mediumQuote = 'https://api.quotable.io/random?minLength=100&maxLength=200'
        const longQuote = 'https://api.quotable.io/random?minLength=200'

        if (quoteLength === 3){
            const response = await fetch(shortQuote) 
            const data = await response.json()
            toggle.current = data
            return data
        } else if (quoteLength === 4){
            const response = await fetch(mediumQuote) 
            const data = await response.json()
            toggle.current = data
            return data
        } else if (quoteLength === 5) {
            const response = await fetch(longQuote)
            const data = await response.json()
            toggle.current = data
            return data
        } else {
            const response = await fetch(shortQuote) 
            const data = await response.json()
            toggle.current = data
            return data
        }
    }
    
    function countDownStart (){
            let cdt = 3
            cdsi  = setInterval(() => {
                cdt--
                countDown.current.innerText = `${cdt}`
                
                if(cdt  === 0){
                    clearInterval(cdsi)
                    gameStart()
                }
                
            },1000)
        }
        
        function gameStart (){

            inputBox.current.removeAttribute('disabled')

            inputBox.current.focus()
   
            elapsedTime()
        }

        function elapsedTime(){
            startTime = new Date() 

            timerEnd = setInterval(() => {
                wperm = Math.round(((wordPOS - 10) / timerFormat()) * 60)
                cpmCal = Math.round((tempCharCount / timerFormat()) * 60)
                wpm.current.innerText = `${wperm}`  
                document.getElementById('cdBox').innerText = `${timerFormat()}`
                cpm.current.innerText = cpmCal

            },1000)
        }
        
        function timerFormat(){
            return Math.floor((new Date() - startTime)/1000)
        }

        

    useEffect(() => {

        const quoteBox = document.getElementById('quoteBox')
        const initWordCount = document.getElementById('progressWords')
        const initCharCount = document.getElementById('progressChar')

       async function newQuote (data){

            quoteBox.innerHTML = ''
 
            data.content.split(' ').map((char) => {
                divIdentifier++
                const divGen = document.createElement('div')
                divGen.id = divIdentifier

                char.split('').map((char,x=0) => {
                    const span = document.createElement('span')
                    span.innerText = char
                    span.id = `${divIdentifier}${x}`
                    span.className = "Text"
                    divGen.appendChild(span)
                    return 1
                })

                quoteBox.appendChild(divGen)
                charCount = data.content.split(' ').join('').split('').length
                wordCount = data.content.split(' ').length
                initWordCount.innerText = `Word 0 / ${wordCount}`
                initCharCount.innerText = `Char 0 / ${charCount}`
                return 1
            })
        }

        let randomVar =  selectedQuoteLength.current
        
        async function nextQuote(count){
            if (count > replayTog.current || count === 0){

                try {
                    document.getElementById(`qL${randomVar}`).classList.remove('selected')
                } catch {
                    if (randomVar === undefined && count > replayTog.current){
                        document.getElementById(`qL${3}`).classList.remove('selected')
                    }
                }

                if (count === replayTog.current + 2){
                    newQuote(await apiCall(3))
                    randomVar = 3
                    document.getElementById(`qL${randomVar}`).classList.add('selected')
                } else if (count === replayTog.current + 3) {
                    newQuote(await apiCall(4))
                    randomVar = 4
                    document.getElementById(`qL${randomVar}`).classList.add('selected')
                } else if (count === replayTog.current + 4) {
                    newQuote(await apiCall(5))
                    randomVar = 5
                    document.getElementById(`qL${randomVar}`).classList.add('selected')
                } else if (count === replayTog.current + 5){
                    
                    try {
                        document.getElementById(`qL${randomVar}`).classList.add('selected')
                    } catch {
                        document.getElementById(`qL${3}`).classList.add('selected')
                    }
                    
                    console.log(gameStarted.current)
                    newQuote(toggle.current)
                    countDownStart()
                    document.getElementById(`gsp`).setAttribute('hidden',true)
                    document.getElementById('quoteBox').classList.add('removeBlur')

                    
                } else {
                    newQuote(await apiCall(selectedQuoteLength.current))
                    gameStarted.current = 0 
                }

            }else if (count < replayTog.current){
                newQuote(toggle.current)
                document.getElementById('quoteBox').classList.add('removeBlur')
                document.getElementById(`gsp`).setAttribute('hidden',true)
                countDownStart()
            }
        }

        nextQuote(count)

        // Clears all fields previously editted during games runtime
        return () => {
            try {
                document.getElementById(`gsp`).removeAttribute('hidden')
                document.getElementById('quoteBox').classList.remove('removeBlur')
                quoteBox.innerHTML = ''
                initWordCount.innerText = ''
                initCharCount.innerText = '' 
                document.getElementById('cdBox').removeAttribute('hidden')
                countDown.current.innerText = `3`
                inputBox.current.setAttribute('disabled',true)
                inputBox.current.value = ''
                accuracyField.current.innerText = `Accuracy 0%`
                wpm.current.innerText = `0`
                clearInterval(timerEnd)
                clearInterval(cdsi) 
                replayTog.current = count
                selectedQuoteLength.current = randomVar
                cpm.current.innerText = '0' 
            } catch {}
            
        }

    },[count]) 

    let tempCharCount = 0 
    let accuracyReport = 0
    let i = 0 
    let cursorPOS = 0;
    
    async function type (e){        
        
        let tempWord;
        document.getElementById(wordPOS).className = 'onWord'  


        if(wordPOS === document.getElementById('quoteBox').children.length + 9){
            tempWord = document.getElementById(wordPOS).innerText.concat('')
        }else {
            tempWord = document.getElementById(wordPOS).innerText.concat(' ')
        }
       
        if (e.target.selectionStart < tempWord.length - 1){
            document.getElementById(`${wordPOS}${e.target.selectionStart}`).className = ''
        } 

        try {   

            if (e.target.selectionStart >= tempWord.length){
    
            } else {
               if (cursorPOS > e.target.selectionStart) {
                
                } else {

                    if (document.getElementById(`${wordPOS}${i}`).innerText === e.target.value[i]){
                        i++
                        tempCharCount++
                    } else {
                        incorrectCharCount++
                    }
                } 
            }
            
            for (let i = 0; i < e.target.selectionStart; i++){

                if (e.target.selectionStart < tempWord.length){

                    if (e.target.value[i] === document.getElementById(`${wordPOS}${i}`).innerText){
    
                        document.getElementById(`${wordPOS}${i}`).className = 'correct'
                
                    }else {
    
                        document.getElementById(`${wordPOS}${i}`).className = 'wrong'
                    }

                } else {

                    break;
                }
            }

            if(e.target.value === tempWord) {
                document.getElementById(wordPOS).className = ''
                wordPOS++ 
                i = 0
                e.target.value = ''
                document.getElementById('progressWords').innerText = `Word ${wordPOS - 10} / ${wordCount}`
                
                if (wordPOS === document.getElementById('quoteBox').children.length + 10) {

                    document.getElementById(`${document.getElementById('quoteBox').children.length + 9}${tempWord.length - 1}`).className = 'correct'
                    tempCharCount ++
                    e.target.setAttribute('disabled',true)
                    clearInterval(timerEnd)
                } 
            }
        } catch(error){
            console.log(error)
        }
       document.getElementById('progressChar').innerText = `Char ${tempCharCount} / ${charCount}`
       accuracyReport = (((charCount - incorrectCharCount)/charCount)*100).toFixed(2)
       accuracyField.current.innerText = `Accuracy ${accuracyReport}%`
       cursorPOS = e.target.selectionStart // value set to identify backspaces
    }


    function cancelPaste(e){
        e.preventDeafault()
    }

   

    return (
        
        <div className='wrapperLanding'>
            <div className='containerLanding'>

                {/* Div that contains game option selections */}

                <div className='containerGameOptions'>
                    <div className='lengthSelectorBar'>
                        <span>Quote Length</span>
                        <span className='divider'>|</span>
                        <button id='qL3' onClick={() => setCount((c) => c + 2)} className='selected'>Short</button>
                        <button id='qL4' onClick={() => setCount((c) => c + 3)}>Medium</button>
                        <button id='qL5' onClick={() => setCount((c) => c + 4)}>Long</button>
                    </div>
                </div>
                
                {/* Code for the game component */}

                <div className='containerGame'>

                    {/* Div that overlays quoteHolder. Starts game on Click  */}

                    <div className='gameStartPrompt' id='gsp'>
                        <MouseOutlinedIcon id='moi'></MouseOutlinedIcon>
                        click here to start game
                    </div>

                    {/* Div that holds the quote */}

                    <div className='quoteHolder' id='quoteBox' onClick={
                        () => {
                            if (gameStarted.current === 0) {
                                setCount((c) => c + 5)
                                gameStarted.current += 1
                            } 
                        }}></div>
                    {/* Div that keeps track of your progress through the quoute via char and word / total */}

                    <div className='progressReport'>
                        <span id ='progressChar'>Char 0 / ?</span> 
                        <span id='progressWords'>Word 0 / ? </span>
                    </div>

                    {/* Element that keeps track of all time throughout the game */}

                    <span className='countDown' ref={countDown} id='cdBox'>3</span>

                    {/* Div that contains the different game options, next, replay etc. */}

                    <div className='selectorButtons'>
                        <span className='bugReport'>
                            <Tippy content='Bug Report' placement='left' delay={[400,0] }>
                                <Link to='/bugReport'><BugReportIcon id='br'></BugReportIcon></Link>    
                            </Tippy>
                        </span>
            
                        <span className='replay'>
                            <Tippy content='Replay' placement='left' delay={[400,0]}>
                            <ReplayIcon id='re' onClick={() => setCount((c) => c - 1)}></ReplayIcon> 
                            </Tippy>
                        </span>

                        <span className='nextGame'>
                            <Tippy content='Next Game' placement='left' delay={[400,0]}>
                            <NavigateNextIcon className='icon' id='nb' onClick={() => setCount((c) => c + 1)}></NavigateNextIcon> 
                            </Tippy>                       
                        </span> 
                    </div>
                    
                </div>

                {/* Div that contains the text input box */}

                <div className='input'>
                    <input type="text" className='typingBox' ref={inputBox} onInput={type} onPaste={cancelPaste} disabled={true} placeholder='Type here...'/> 
                </div>

                {/* Div that contains the performance reports: wpm, cpm, and accuracy. */}

                <div className='performanceReport'>
                    <span className='wpmTitle'>WPM:</span>
                    <span className='wpm' ref={wpm}>0</span> 
                    <span className='divider'>|</span>
                    <span className='accuracy' id='accuracy' ref={accuracyField}>Accuracy 0% </span>
                    <span className='divider'>|</span>
                    <span id='cpmTitle'>CPM:</span>
                    <span className='cpm' ref={cpm}>0</span>
                </div>
            </div>     
        </div>
    )

}