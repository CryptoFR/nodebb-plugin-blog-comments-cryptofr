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
        <h3 class="modal-subtitle">Using social networks</h3>
        <!--<a data-link="https://testforum.cryptofr.com/auth/facebook" href="#" data-network="Facebook">
          <img data-link="https://testforum.cryptofr.com/auth/facebook" href="#" data-network="Facebook" alt="Facebook" class="modal-login" src="https://via.placeholder.com/240x50.png?text=Facebook%20Login"/>
        </a>-->
        <a data-link="https://testforum.cryptofr.com/auth/google" href="#" data-network="Google">
          <button class="google-auth"><i class="fa fa-google"><span>Google Login</span></button>
        </a>
        <a data-link="https://testforum.cryptofr.com/auth/twitter" href="#" data-network="Twitter">
        <img class="modal-login" alt="Twitter" data-network="Twitter" data-link="https://testforum.cryptofr.com/auth/twitter" src="https://via.placeholder.com/240x50.png?text=Twitter%20Login"/>
          <button class="google-auth"><i class="fa fa-twitter"><span>Twitter Login</span></button>
        </a>
        <a data-link="https://testforum.cryptofr.com/auth/github" href="#" data-network="Github">
        <img data-link="https://testforum.cryptofr.com/auth/github" data-network="Github"  class="modal-login" alt="Github" src="https://via.placeholder.com/240x50.png?text=Github%20Login"/>
          <button class="google-auth"><i class="fa fa-github"><span>Github Login</span></button>
        </a>
      </div>
    </div>
  </div>

</div>
