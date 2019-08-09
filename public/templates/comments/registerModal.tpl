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
        <a href="https://cryptoforum.testing/auth/facebook" target="_blank">
          <img alt="Facebook" class="modal-login" src="https://via.placeholder.com/240x50.png?text=Facebook%20Login"/>
        </a>
        <a href="https://cryptoforum.testing/auth/google" target="_blank">
          <img class="modal-login" alt="Google" src="https://via.placeholder.com/240x50.png?text=Google%20Login"/>
        </a>
        <a href="https://cryptoforum.testing/auth/twitter">
        <img class="modal-login" alt="Twitter" src="https://via.placeholder.com/240x50.png?text=Twitter%20Login"/>
        </a>
        <a href="https://cryptoforum.testing/auth/github">
        <img class="modal-login" alt="Github" src="https://via.placeholder.com/240x50.png?text=Github%20Login"/>
        </a>
      </div>
    </div>
  </div>

</div>
