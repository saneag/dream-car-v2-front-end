import React from 'react'

import styles from './styles.module.scss'

function Contact() {
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    return (
        <main className={styles.main}>
            <div className={styles.contact_page}>
                <div className={styles.form}>
                    <div className={styles.input_field}>
                        <label htmlFor='email_input'>Email</label>
                        <input
                            placeholder='Enter Email'
                            id='email_input'
                            type='text'
                            maxLength='20'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor='message_input'>Message</label>
                        <textarea
                            placeholder='Enter Message'
                            id='message_input'
                            type='text'
                            maxLength='200'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    <button
                        className={styles.send_btn}
                        onClick={() => { }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Contact