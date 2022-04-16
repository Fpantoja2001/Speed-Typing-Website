import './index.scss'
import React, {useRef } from 'react'

export default function PracticeMode (){

    const timerUpdate = useRef(),wpm = useRef(),countDown = useRef(),referenceText = useRef(),inputBox = useRef(), accuracy = useRef()
    
    const quote = "We are born at a given moment, in a given place and, like vintage years of wine, we have the qualities of the year and of the season of which we are born. Astrology does not lay claim to anything more."

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

    // These variables serve to keep count of when the user either types a chracter correctly or incorrectly,
    // this is so the users accuracy can be calculated at the end.
    let incorrectCharacters = 0
    let correctCharacters = 0
    
    // This variable serves to number the divs in which whole words will be split up into indivisual Span tags
    let divIdentifier = 9;

    // Span Quote functions to structure the reference text so that I can iterate both through
    // the entire words in it and each character indivisually. I did this so that I can underline the
    // word the user is on and apply either the 'correct' or 'incorrect' css class to each character
    // indivisually to help the user determine when they either type a character correctly or incorrectly.

    // It essentially is taking each word and assigning it a div, and it then takes every chracter of that word 
    // and assigns it its own div

    const spanQuote = quote.split(' ').map((char) => {
        
        divIdentifier++;

        const charToSpan = char.split('').map((char,x=0) => {
            return <span id={`${divIdentifier}${x}`} className='text'>{`${char}`}</span>
        })
 
        return <div id={divIdentifier}>{charToSpan}</div>
    })

    window.onload = countDownTimer()

    // This function controls the start of game logic
    function GameStart(){

        // Disables the input box until the countdown timer reaches 0
        inputBox.current.removeAttribute('disabled')

        // Places cursor in the box the second the game starts 
        inputBox.current.focus()

        // Starts the elapsed time timer
        elapsedTime()


    }
    
    

    // This is the function that gets called everytime a user types; It handles everything having to 
    // with making sure the user types correctly to edge cases.

    function type (e){

        let tempWord;

        progress()

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

        function progress(){
            console.log(document.getElementById('quoteBox').children.length/(wordPOS-9))

            document.getElementById('pb').style.width = `${((wordPOS - 9)/document.getElementById('quoteBox').children.length)*100}%`
        }

            
              
       // This statement checks if the user typed word matches the temp word above 

       if(e.target.value === tempWord) {

            // Clears the underline of the current word
            document.getElementById(wordPOS).className = ''

            // If the word does match, then it increases the wordPOS variable to move 
            // the user onto the next word. 
            ++wordPOS  
            console.log(wordPOS) 

            // This resets the value of the input field            
            e.target.value = ''

            //Updates and Calculates the WPM of the user after they their first word correct
            wpm.current.innerText = `WPM: ${Math.round(((wordPOS - 10) / timerFormat()) * 60)}`
            
       }
       
       // This if statement defines the win condition, and if they are met then the input box 
       // becomes disabled
       if (wordPOS > document.getElementById('quoteBox').children.length + 9) {
           
           // This disables the input box once the game ends
           e.target.setAttribute('disabled',true)

           // Ends the timer 
           stopInterval()

           // Prompts Next Race Button 
           document.getElementById('nb').removeAttribute('hidden')
       } 
        
    }

    // These functions (elapsedTime & timerFormat) create the timer that is used to help calculate the wpm
    function elapsedTime(end){
        startTime = new Date() 

        timerEnd = setInterval(() => {
            timerUpdate.current.innerText = `Time: ${timerFormat()}`
            
        },1000)
    }

    function stopInterval(){
        clearInterval(timerEnd)
    }

    function timerFormat(){
        return Math.floor((new Date() - startTime)/1000)
    }

    // This function operates the count down timer
    
    function countDownTimer(){
        let cdt = 6;
        
        cdsi = setInterval(() => {
            cdt--;
            countDown.current.innerText = `Count Down: ${cdt}`
            if(cdt === 0){
                clearInterval(cdsi)
                GameStart()
            }
        }, 1000);

    }

    // This disables the user from pasting in the input box
    function cancelPaste(e){
        e.preventDeafault()
    }

    // This function reloads the page on press of 'next' button
    function reload(){
        window.location.reload()
    }
    

    return (
        
        <div className='page'>

            <div className='progressBar'> 
                <p>Progress Bar</p>
                <div className='update' id='pb'></div>
            </div>

            <div className='wrapper'>

                <div className='reference' id='quoteBox' ref={referenceText}>
                    {spanQuote}
                </div>

                
                <input type="text" className='typingBox' ref={inputBox} onInput={type} onPaste={cancelPaste} disabled='true' placeholder='Type here...'/>
                
            </div>

            
                
            <div className='stats' >

                <div className='currentStats'>
                    <div className ='timer' ref={timerUpdate}>Time: 0</div>

                    <div className='wpm' ref={wpm}>WPM: 0</div>

                    <div className='countdown' ref={countDown}>Count Down: 6</div>

                    <div className='accuracy' ref={accuracy}>Accuracy: 0% </div>
                </div>

                <div className='historicalStats'></div>

                
                    
            </div> 
            
            <div className='button'>
                <button className='nextBox' id='nb' hidden={true} onClick={reload}>Next Race</button>
            </div> 

        </div>
    )

}