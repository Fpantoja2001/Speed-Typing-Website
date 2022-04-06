import './index.scss'
import { useRef } from 'react'

export default function PracticeMode (){

    const referenceText = useRef()
    const userInput = useRef()
    let textIndex = 0
    let maxIncrease = 1;
    let wordCount = 0



    // function format (event) {
        
    //     const text = referenceText.current.textContent.split('')

        
    //     if (event.target.value[textIndex] === text[textIndex]){
            
    //         maxIncrease = maxIncrease + 1

    //         textIndex = textIndex +1

    //         userInput.current.setAttribute('maxLength', maxIncrease)
            
    //         console.log(event.target.value[textIndex], text[textIndex])

    //     } else {

    //         maxIncrease = maxIncrease - 1;
    //         userInput.current.setAttribute('maxLength', maxIncrease)
    //     }

        
    // }

    function format (event){

        const word = referenceText.current.textContent.split(' ')

        const letters = word[wordCount].split('').map(x => x.charCodeAt())

        if (word.length === wordCount) {

            console.log('You Win 1')

        } else if (letters.length === textIndex){
            
            wordCount = wordCount + 1
            textIndex = 0
            console.log(word.length,wordCount)

         } else {

            if (event.charCode >= 32 && event.charCode === letters[textIndex]){

                console.log(letters[textIndex], event.charCode)
                textIndex = textIndex + 1   
                maxIncrease = maxIncrease + 1   
                userInput.current.setAttribute('maxLength',maxIncrease)

            }else{

                console.log('wrong')
                userInput.current.setAttribute('maxLength',maxIncrease)    

            }

        
        }  

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