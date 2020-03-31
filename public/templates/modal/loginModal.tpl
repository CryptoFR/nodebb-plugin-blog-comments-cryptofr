<div id="login-modal" class="modal" data-closed="1">
  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="modal-close">
        <i class="fad fa-times"></i>
      </span>
    </div>
    <div class="modal-body clearfix">
      <div class="modal-login-form">
        <h4 class="modal-subtitle">Connectez-vous par e-mail</h4>
        <form action="#" id="login-form" method="POST">
          <input class="modal-input" name="email" type="text" value="" placeholder="Email" />
          <input class="modal-input" name="password" type="password" value="" placeholder="Password" />
          <input name="_csrf" type="hidden" value=""/>
          <button class="modal-button" type="submit">Login</button>
          <div class="nodebb-error"></div>
        </form>
        <p class="caption-login-text">Vous n'avez pas encore de compte? <a href="#" class="register-modal-open">S'inscrire</a> <a href="#" class="modal-forgot-password"> Mot de passe oublié?</a></p>
      </div>
      <div class="modal-separator">
        <span>
          ou
        </span>
      </div>
      <div class="modal-login-alternative">  
        <ul class="alt-logins">
          <li class="google">
            <a rel="nofollow noopener noreferrer alt-login" target="_top" data-link="https://testforum.cryptofr.com/auth/google" href="#" data-network="Google">
              <i class="fab fa-google"></i>
            </a>
          </li>
          <li class="facebook">
            <a rel="nofollow noopener noreferrer alt-login" target="_top" data-link="https://testforum.cryptofr.com/auth/facebook" href="#" data-network="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li class="twitter">
            <a rel="nofollow noopener noreferrer alt-login" target="_top" data-link="https://testforum.cryptofr.com/auth/twitter" href="#" data-network="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="github">
            <a rel="nofollow noopener noreferrer alt-login" target="_top" data-link="https://testforum.cryptofr.com/auth/github" href="#" data-network="Github">
              <i class="fab fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal-footer">
      <div class="register-link">
        Vous n'avez pas encore de compte? <a href="#" class="register-modal-open">S'inscrire</a>
      </div>
      <div class="logo">
        <img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon">
      </div>
    </div>
  </div>
</div>