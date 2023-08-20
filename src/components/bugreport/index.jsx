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

            <h1>
                Bug Report
            </h1>

            <p>
                I am not the greatest developer, thus this form below is for you to 
                report any bugs you many have found. Please be as thorough as possible, 
                and if you're up to it include the steps to recreate the bug, as this would
                make it easier to find the bug and would be very appreciated. Thank you !
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
        
    )
}