import React from 'react'
import Reaptcha from 'reaptcha'

const Modal = ({
    csrf,
    onVerified,
    username,
    email,
    password,
    confirmPassword,
    onChangeUsername,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeEmail,
    handleCloseModal,
    onSubmit,
    onBlurEmail,
    onBlurUsername,
    userTaken,
    emailTaken,
    registerActivated
}) => (
    <div className="modal" style={{display: 'block'}}>
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-header-first-row">
                <img class="modal-header-icon" alt="Icon" src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/site-logo.png"/>
                <span class="modal-close" onClick={handleCloseModal}>&times;</span>
              </div>
              <div class="modal-header-title-wrapper">
                <h3 class="modal-header-title">You need to be a member to comment, just a few more seconds</h3>
              </div>
            </div>
            <div class="modal-body clearfix">
              <div class="modal-col">
                <h4 class="modal-subtitle">Register</h4>
                <form onSubmit={onSubmit}>
                  <input class="modal-input" name="emcdail" type="email" value={email} onBlur={onBlurEmail} onChange={onChangeEmail} placeholder="Email" />
                  {emailTaken && <div className="error-message">This email is taken</div>}
                  <input class="modal-input" name="username" type="text" value={username} onBlur={onBlurUsername} onChange={onChangeUsername} placeholder="Username" />
                  {userTaken && <div className="error-message">This user is taken</div>}
                  <input class="modal-input" name="password" type="password" value={password} onChange={onChangePassword} placeholder="Password" />
                  <input class="modal-input" name="password-confirm" type="password" value={confirmPassword} onChange={onChangeConfirmPassword} placeholder="Confirm password" />
                  <input name="_csrf" type="hidden" value={csrf} />
                  <div class="modal-input">
                    <input name="terms" type="checkbox" value=""/>
                    <span>I have read terms and conditions</span>
                  </div>
                  <Reaptcha onVerify={onVerified} sitekey="6LcL2LEUAAAAANP2M8PsNoMotoiFBlFApE5pIX0y" />
                  <button 
                    class="modal-button" 
                    disabled={!registerActivated} type="submit"
                    style={{backgroundColor: !registerActivated ? 'grey' : ''}}
                  >Register</button>
                </form>
              </div>
              <div class="modal-col">
                <h4 class="alt-acc">Alternative Access</h4>
                <ul class="alt-logins">
                        
                  <li class="twitter"><a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/twitter" href="#" data-network="Twitter"><i class="fa fa-twitter-square fa-2x"></i></a></li>
                  
                  <li class="google"><a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/google" href="#" data-network="Google"><i class="fa fa-google-plus-square fa-2x"></i></a></li>
                  
                  <li class="github"><a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/github" href="#" data-network="Github"><i class="fa fa-github fa-2x"></i></a></li>
                        
                </ul>
              </div>
            </div>
          </div>
          </div>
)

export default Modal