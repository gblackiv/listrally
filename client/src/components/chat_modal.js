import React from 'react';
import '../assets/css/chat_modal.scss'

export default props => (    
    <div>

       {/* <!-- Modal REMOVE MODAL SHOW--> */}
    <div className="flex align-center align-vert modal modal-align modal-show">
        <div className="modal-container dark-text">
            <header className="modal-header">
                <h5>Group Chat</h5>
                <a className="modalClose modalCloseX" aria-hidden="true">&#x2715;</a>
            </header>
            <main className="modal-content">
                <section className="message-card">
                    <div className="message-container-left">
                        <div className="img-container">
                            <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                        </div>
                        <div className="message-content">
                            <p><strong id="chatUserName">Ninja Tom</strong> <small><a href="#">(555) 555-5555</a></small></p>
                            <p id="message">
                                Don't forget to bring napkins! I'll bring the Red Cups.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="message-card">
                    <div className="message-container-right">
                        
                        <div className="message-content">
                            <p><strong id="chatUserName">Moxie Lee</strong> <small><a href="#">(911) 911-1119</a></small></p>
                            <p id="message">
                                I'm bringing thr red cups! You bring the Utensils.
                            </p>
                        </div>
                        <div className="img-container">
                                <img src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_female-512.png" />
                            </div>
                    </div>
                </section>

                <section className="message-card">
                        <div className="message-container-left">
                            <div className="img-container">
                                <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Robot-512.png" />
                            </div>
                            <div className="message-content">
                                <p><strong id="chatUserName">Robot Jim</strong> <small><a href="#">(010) 001-1101</a></small></p>
                                <p id="message">
                                    Does anyone have any motor oil?
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="message-card">
                            <div className="message-container-right">
                                
                                <div className="message-content">
                                    <p><strong id="chatUserName">Ninja Tom</strong> <small><a href="#">(555) 555-5555</a></small></p>
                                    <p id="message">
                                        Ninja Tom needs a ride (Ninja Tom speaks in third person).
                                    </p>
                                </div>
                                <div className="img-container">
                                        <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                                    </div>
                            </div>
                        </section>

            </main>
            <footer className="modal-footer">
                <button className="modalClose modalCloseBtn btn btn-red">Close</button>
            </footer>
        </div>
    </div>

    </div>
)