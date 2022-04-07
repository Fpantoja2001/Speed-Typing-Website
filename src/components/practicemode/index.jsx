import './index.scss'
import { useRef } from 'react'

export default function PracticeMode (){

    const referenceText = useRef()   
    let wordCount = 0

    function format (event){

        console.log(event.target.current)

        const word = referenceText.current.textContent.split(' ')

        const letters = word[wordCount].concat(' ')


        if (event.target.value === letters) {
            
            wordCount = wordCount + 1  
            
            event.target.value = ''
            
        }
        
        if (wordCount === word.length){
            
            console.log('win')
            event.target.setAttribute('disabled',true)

        }

    }

    return (
        
        <div className='page'>
            
            <p className='reference' ref={referenceText} >
                Hello my name is carl.
            </p>

            <input type="text" className='typingBox' onInput={format}/>

        </div>
    )

}