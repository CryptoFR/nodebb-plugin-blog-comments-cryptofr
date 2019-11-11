<div id="register-modal" class="modal" data-closed="1">
  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-header-first-row">
        <img class="modal-header-icon" alt="Icon" src="https://via.placeholder.com/80x80.png?text=Icon"/>
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-header-title-wrapper">
        <h3 class="modal-header-title">You need to be a member to comment, just a few more seconds</h3>
      </div>
    </div>
    <div class="modal-body clearfix">
      <div class="modal-col">
        <h3 class="modal-subtitle">Register</h3>
        <form action="#" id="login-form" method="POST">
          <input class="modal-input" name="email" type="email" value="" placeholder="Email" />
          <div class="email-errors">
            
          </div>
          <input class="modal-input" name="username" type="text" value="" placeholder="Username" />
          <div class="username-errors">
            
          </div>
          <input class="modal-input" name="password" type="password" value="" placeholder="Password" />
          <input class="modal-input" name="password-confirm" type="password" value="" placeholder="Confirm password" />
          <input name="_csrf" type="hidden" value=""/>
          <div class="modal-input">
            <input name="terms" type="checkbox" value=""/>
            <span>I have read terms and conditions</span>
          </div>
          <div id="google-callback"></div>
          <button class="modal-button" type="submit">Register</button>
        </form>
      </div>
      <div class="modal-col">
        <a data-link="https://testforum.cryptofr.com/auth/google" href="#" data-network="Google"  class="google-auth social-auth-buttons">
          <i class="fa fa-google"></i><span>Google Login</span>
        </a>
        <a data-link="https://testforum.cryptofr.com/auth/twitter" href="#" data-network="Twitter" class="twitter-auth social-auth-buttons">
          <i class="fa fa-twitter"></i><span>Twitter Login</span>
        </a>
        <a data-link="https://testforum.cryptofr.com/auth/github" href="#" data-network="Github"  class="github-auth social-auth-buttons">
          <i class="fa fa-github"></i><span>Github Login</span></button>
        </a>
      </div>
    </div>
  </div>

</div>
