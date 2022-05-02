import './index.scss'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function BugReport () {
    
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_cisq9mt',
            'template_ndc45qq',
            form.current,
            'qQWg7UXA_Y_UeDt4g'
        ).then((result) => {
            window.alert('success')
        }, (error) => {
            window.alert('fail')
        })
    }

    return (

        <div className='wrapper'>

            <h1>
                Bug Report
            </h1>

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
                            <input type="text" name="subject" placeholder='Subject' required/>
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