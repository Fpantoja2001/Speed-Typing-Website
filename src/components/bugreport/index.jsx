import './index.scss'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function BugReport () {
    
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_hhpbevl',
            'template_m5quqir',
            form.current,
            'uE9ktrV1sT1SDdPNZ'
        ).then((result) => {
            window.alert('success')
            form.current.reset()
            console.log(form.current)
        }, (error) => {
            window.alert('fail')
        })

        
    }

    return (

        <div className='wrapperBugReport'>
            <div className='containerKnownBugs'>
                <h1>
                    Known Bugs
                </h1>
                <div className='textHolder'>
                    <div>
                       b1.1 - 
                    </div>
                    <p>
                        Quote length selection dissapears on next game button press and reappears on game start press.
                    </p>
                    
                </div>
                <div  className='textHolder'>
                    <div>
                       b1.2 - 
                    </div>
                    <p>
                        The inability to enter in double dash '--' when a quote requires it.  
                    </p>
                    
                </div>
                <div  className='textHolder'>
                    <div>
                       b1.3 - 
                    </div>
                    <p>
                        Each indivisual period in '...' will not turn green or red if it is either correct or wrong 
                        until all characters in its spot have been filled.
                    </p>
                    
                </div>
            </div>

            <div className='containerBugReport'>
                
                <h1>
                    Bug Report
                </h1>

                <p>
                    This form is for you to report any bugs you many have found. Please be as thorough as possible, Thank you!
                </p>

                <div className='contact-form'>
                    <form ref={form} onSubmit={sendEmail}>

                        <ul>
                            <li className='left'>
                                <input type="text" name="name" placeholder='Name' required/>
                            </li>

                            <li className='left'>
                                <input type="email" name="email" placeholder='Email' required/>
                            </li>
                            <li>
                                <input type="text" name='subject' placeholder='Subject' />
                            </li>
                            <li>
                                <textarea placeholder='Message' name='message' resize='none' required></textarea>
                            </li>
                            <li>
                                <input type="submit" className='submit-button'  value='Send'/>
                            </li>
                        </ul>
                    </form>

                </div>
            </div>

            

        </div>
        
    )
}