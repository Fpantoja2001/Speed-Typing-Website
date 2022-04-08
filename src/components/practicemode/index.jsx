import './index.scss'
import { useRef } from 'react'

export default function PracticeMode (){

    const referenceText = useRef()   
    let wordCount = 0

    function format (event){

        console.log(event.target.current)

        const word = referenceText.current.textContent.split(' ')

        const letters = word[wordCount].concat(' ')

        event.target.setAttribute('maxLength',letters.length)

        event.target.focus()


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

            <div className='wrapper'>

                <p className='reference' ref={referenceText} >
                One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don't throw it away.
                </p>

                
                <input type="text" className='typingBox' onInput={format}/>
                

                

            </div>
            
            

        </div>
    )

}