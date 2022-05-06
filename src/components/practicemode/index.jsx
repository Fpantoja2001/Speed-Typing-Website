import './index.scss'
import React, {useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReplayIcon from '@mui/icons-material/Replay';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function PracticeMode (){

    const timerUpdate = useRef(),wpm = useRef(),countDown = useRef(),inputBox = useRef(), accuracyField = useRef()

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
   

    // These variables serve to keep count of when the user either types a chracter correctly or incorrectly,
    // this is so the users accuracy can be calculated at the end.
    let incorrectCharCount = 0
    let charCount;
    let wordCount;

    // This variable serves to number the divs in which whole words will be split up into indivisual Span tags
    let divIdentifier = 9;
    let data;
    const quoteBox = document.getElementById('quoteBox')
    const authorField = document.getElementById('author')
    const initWordCount = document.getElementById('progressWords')
    const initCharCount = document.getElementById('progressChar')


    
    // This useEffect works to structure the reference text so that I can iterate both through
    // the entire words in it and each character indivisually. I did this so that I can underline the
    // word the user is on and apply either the 'correct' or 'incorrect' css class to each character
    // indivisually to help the user determine when they either type a character correctly or incorrectly.

    // It essentially is taking each word and assigning it a div, and it then takes every chracter of that word 
    // and assigns it its own div

    const [count,setCount] = useState(0)

    let toggle = useRef()
    let replayTog = useRef()

    async function apiCall (){

        const response = await fetch("https://api.quotable.io/random") 
        const data = await response.json()
        toggle.current = data
        return data
    }
    
    function countDownStart (){
            let cdt = 6
            cdsi  = setInterval(() => {
                cdt--
                countDown.current.innerText = `${cdt}`
                
                if(cdt  === 0){
                    document.getElementById('cdBox').setAttribute('hidden',true)
                    document.getElementById('divGone').setAttribute('hidden',true)   
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
                timerUpdate.current.innerText = `Time: ${timerFormat()}`
                wpm.current.innerText = `WPM: ${wperm}`  
            },1000)
        }
        
        function timerFormat(){
            return Math.floor((new Date() - startTime)/1000)
        }

        

    useEffect(() => {

        const quoteBox = document.getElementById('quoteBox')
        const authorField = document.getElementById('author')
        const initWordCount = document.getElementById('progressWords')
        const initCharCount = document.getElementById('progressChar')

       async function newQuote (data){

            authorField.innerText = `- ${data.author}`
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

                })

                quoteBox.appendChild(divGen)
                charCount = data.content.split(' ').join('').split('').length -1
                wordCount = data.content.split(' ').length
                initWordCount.innerText = `Word 0 / ${wordCount}`
                initCharCount.innerText = `Char 0 / ${charCount}`
            })
        }
        

        async function nextQuote(count){

            if (count > replayTog.current || count === 0){
                newQuote(await apiCall()) 
                
            }else if (count < replayTog.current){
                newQuote(toggle.current)
            }
                
        }
        
        nextQuote(count)
        
        countDownStart()
        
        // Clears all fields previously editted during games runtime

        return () => {
            quoteBox.innerHTML = ''
            authorField.innerText = ''
            initWordCount.innerText = ''
            initCharCount.innerText = '' 
            document.getElementById('cdBox').removeAttribute('hidden')
            document.getElementById('divGone').removeAttribute('hidden')
            countDown.current.innerText = `6`
            inputBox.current.setAttribute('disabled',true)
            inputBox.current.value = ''
            document.getElementById('pp').innerText = `Progress 0%`
            accuracyField.current.innerText = `Accuracy: 0%`
            wpm.current.innerText = `WPM: 0`
            timerUpdate.current.innerText = `Time: 0`
            clearInterval(timerEnd)
            clearInterval(cdsi) 
            document.getElementById('pb').style.width = 0 
            replayTog.current = count
        }

    },[count]) 

    // This is the function that gets called everytime a user types; It handles everything having to 
    // with making sure the user types correctly to edge cases.
   
    let tempCharCount = 0 
    let accuracyReport = 0
    let i = 0 
    

    function type (e){        
        let tempWord;

        //Updates and Calculates the WPM of the user after they their first word correct
        // wpm.current.innerText = `WPM: ${Math.round(((wordPOS - 10) / timerFormat()) * 60)}`

        accuracyReport = (((charCount - incorrectCharCount)/charCount)*100).toFixed(2)
        accuracyField.current.innerText = `Accuracy: ${accuracyReport}%`
        document.getElementById(wordPOS).className = 'onWord' // This underlines the current word the user is on
        
            
        // This variable takes the current word the user is on and adds a space at the end so the user
        // gets a sense of entering a word essentially. The only exception is the last word, so once the 
        // user enters the last word, the game ends. 

        if(wordPOS === document.getElementById('quoteBox').children.length + 9){

            tempWord = document.getElementById(wordPOS).innerText.concat('')

        }else {

            tempWord = document.getElementById(wordPOS).innerText.concat(' ')

        }

        // This if statement works to make sure that if the user backspaces, the state of characters he has
        // already typed whether right or wrong gets erased. This is essentially achieved by setting the class
        // of any index above the cursor position to ''

        if (e.target.selectionStart < tempWord.length - 1){
            
            document.getElementById(`${wordPOS}${e.target.selectionStart}`).className = ''

        }

        

        // Same function as the one below that checks the user input to see if user typed in
        // correct chars, the only difference is its out of the for loop so it can be used as 
        // a char progress counter for the user to see 

        if (e.target.selectionStart === tempWord.length){
               
        } else{

            if (e.target.value[i] === document.getElementById(`${wordPOS}${i}`).innerText && e.target.value[i] !== ' '){
                i++
                tempCharCount++
                document.getElementById('progressChar').innerText = `Char ${tempCharCount} / ${charCount}`
                document.getElementById('pb').style.width = `${(tempCharCount/charCount)*100}%`
                document.getElementById('pp').innerText = `Progress ${Math.round((tempCharCount/charCount)*100)}%`

            } else {
                incorrectCharCount++
            }
        }


        

        // This for loop, loops through the user input field and the reference text to make sure all
        // all letters are typed correctly, and it applies classes based on that fact 
        
        for (let i = 0; i < e.target.selectionStart; i++){

            // This if statement was created to ignore the space at the end of the word
                
            if (e.target.selectionStart === tempWord.length){

                break; 
                
            } else{

                if (e.target.value[i] === document.getElementById(`${wordPOS}${i}`).innerText){

                document.getElementById(`${wordPOS}${i}`).className = 'correct'
            
                }else {

                    document.getElementById(`${wordPOS}${i}`).className = 'wrong'
                }
            }
            
        }
        
              
       // This statement checks if the user typed word matches the temp word above 

       if(e.target.value === tempWord) {

            // Clears the underline of the current word
            document.getElementById(wordPOS).className = ''

            // If the word does match, then it increases the wordPOS variable to move 
            // the user onto the next word. 
            ++wordPOS  

            i = 0

            // This resets the value of the input field            
            e.target.value = ''

            
            // Updates the word count for the user
            document.getElementById('progressWords').innerText = `Word ${wordPOS - 10} / ${wordCount}`
       }

       // This if statement defines the win condition, and if they are met then the input box 
       // becomes disabled
       if (wordPOS - 1 === document.getElementById('quoteBox').children.length + 9) {

           // This disables the input box once the game ends
           e.target.setAttribute('disabled',true)

           // Ends the timer 
           clearInterval(timerEnd)


       }   
        
    }

    // These functions (elapsedTime & timerFormat) create the timer that is used to help calculate the wpm
   
    // Stops the elapsed time timer when the game ends

    // This disables the user from pasting in the input box
    function cancelPaste(e){
        e.preventDeafault()
    }

    // This function reloads the page on press of 'next' button

    return (
        
        <div className='page'>
            
            <div className='wrapper'>
                <div className='postGameReport' id='pgr' hidden={true}>

                    <div className='heading'>

                        <h1>Post Game Report</h1>

                    
                    </div>

                    <div className='postStats'>
                        <div className='wpmReport' id='wpmReport'>WPM: 0</div>
                        <div className='accuracyReport' id='accuracyReport'>Accuracy: 0</div>
                    </div>
                    
                </div>
                <div className='progressStats'>
                    <span className ='timer' ref={timerUpdate}>Time: 0</span>
                    <span className='countDown' ref={countDown} id='cdBox'>6</span>
                    <span className='divider' id='divGone'>|</span>
                    <span id ='progressChar'>Char 0 / ?</span>
                    <span className='divider'>|</span>
                    <span id='progressWords'>Word 0 / ? </span>
                    
                </div>
                
                <div className='reference' id='quoteBox'></div>

                <div className='authorHolder'>
                    <div className='author' id='author'>Author: </div>
                </div>

                <div className='input'>
                    <input type="text" className='typingBox' ref={inputBox} onInput={type} onPaste={cancelPaste} disabled={true} placeholder='Type here...'/> 
                </div>

                <div className='progressBar'>
                    <div className='update' id='pb'></div>
                </div>
   
                <div className='mainStats'>
                    <span className='progressPercent' id='pp'>Progress 0%</span>
                    <span className='wpm' ref={wpm}>WPM: 0</span>
                    <span className='divider'>|</span>
                    <span className='accuracy' id='accuracy' ref={accuracyField}>Accuracy: 0% </span>
                </div>

                <div className='postGameOptions' id='pgo'>

                    <span className='bugReport'>
                        <Tippy content='Bug Report' delay={[400,0]}>
                            <Link to='/bugReport'><BugReportIcon id='br'></BugReportIcon></Link>    
                        </Tippy>
                    </span>
                    
                    <span className='replay'>
                        <Tippy content='Replay' delay={[400,0]}>
                           <ReplayIcon id='re' onClick={() => setCount((c) => c - 1)}></ReplayIcon> 
                        </Tippy>
                    </span>

                    <span className='nextGame'>
                        <Tippy content='Next Game' delay={[400,0]}>
                           <NavigateNextIcon className='icon' id='nb' onClick={() => setCount((c) => c + 1)}></NavigateNextIcon> 
                        </Tippy>                       
                    </span>

                </div>
                
            </div> 

        </div>
    )

}