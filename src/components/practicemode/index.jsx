import './index.scss'
import { useRef } from 'react'

export default function PracticeMode (){

    const referenceText = useRef()
    const userInput = useRef()
    let textIndex = 0    
    let wordCount = 0
    let maxIncrease = 1;
    let wordDisplay = []

    function format (event){

        const word = referenceText.current.textContent.split(' ')

        const letters = word[wordCount].split('').map(x => x.charCodeAt())

        if (event.charCode === letters[textIndex] && event.charCode !== 32) {
            
            console.log(event.charCode, letters[textIndex])
            textIndex = textIndex + 1
            maxIncrease = maxIncrease + 1
            userInput.current.setAttribute('maxLength',maxIncrease)
            
        }
        if (letters.length === textIndex){
            
            userInput.current.setAttribute('placeholder',wordDisplay.push(word[wordCount]))
            wordCount = wordCount + 1
            maxIncrease = maxIncrease + 1
            textIndex = 0           
            console.log('switch')
            console.log(wordDisplay)

        }
        if (wordCount === word.length){
            
            console.log('win')
            userInput.current.setAttribute('disabled',true)

        }
        if (event.charCode === 32){
            console.log('space')
        }


        // if (word.length === (wordCount)) {

        //     console.log('You Win 1')

        // } else if (letters.length === textIndex){
            
        //     wordCount = wordCount + 1
        //     textIndex = 0
        //     console.log(word.length,wordCount)

        //  } else {

        //     if (event.charCode >= 32 && event.charCode === letters[textIndex]){

        //         console.log(letters[textIndex], event.charCode)
        //         textIndex = textIndex + 1   
        //         maxIncrease = maxIncrease + 1   
        //         userInput.current.setAttribute('maxLength',maxIncrease)

        //     }else{

        //         console.log('wrong')
        //         userInput.current.setAttribute('maxLength',maxIncrease)    

        //     }

        
        // }  

    }

    return (
        
        <div className='page'>
            
            <p className='reference' ref={referenceText} >
                Hello my name is carl.
            </p>

            <input type="text" className='typingBox' onKeyPress={format} ref={userInput} maxLength={maxIncrease}/>

        </div>
    )

}