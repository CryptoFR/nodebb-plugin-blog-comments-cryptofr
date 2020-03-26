<div id="login-modal" class="modal" data-closed="1">
  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-body clearfix">
      <div class="modal-login-form">
        <h4 class="modal-subtitle">Connexion</h4>
        <form action="#" id="login-form" method="POST">
          <div class="email-input-wrapper">
            <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/user.svg" alt="email" class="icon inactive">
            <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/user-active.svg" alt="twitter login" class="icon active">
            <input class="modal-input" name="email" type="text" value="" placeholder="Email" />
          </div>
          <div class="password-input-wrapper">
            <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/key.svg" alt="mot de passe" class="icon inactive">
            <input class="modal-input" name="password" type="password" value="" placeholder="Mot de passe" />
          </div>
          <input name="_csrf" type="hidden" value=""/>
          <button class="modal-button" type="submit">Se connecter</button>
          <div class="nodebb-error"></div>
        </form>
        <p class="caption-login-text"><a href="#" class="modal-forgot-password"> Mot de passe oublié?</a></p>
      </div>
      <div class="modal-separator">
        <span>ou</span>
      </div>
      <div class="modal-login-alternative">  
        <ul class="alt-logins">
          <li class="google">
            <a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/google" href="#" data-network="Google">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/google.svg" alt="google login" class="icon inactive">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/google-active.svg" alt="google login" class="icon active">
            </a>
          </li>
          <li class="facebook">
            <a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/twitter" href="#" data-network="Twitter">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/facebook.svg" alt="twitter login" class="icon inactive">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/facebook.svg" alt="twitter login" class="icon active">
            </a>
          </li>
          <li class="twitter">
            <a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/twitter" href="#" data-network="Twitter">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/twitter.svg" alt="twitter login" class="icon inactive">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/twitter.svg" alt="twitter login" class="icon active">
            </a>
          </li>
          <li class="github">
            <a rel="nofollow noopener noreferrer" target="_top" data-link="https://testforum.cryptofr.com/auth/github" href="#" data-network="Github">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/github.svg" alt="github login" class="icon inactive">
              <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/github.svg" alt="github login" class="icon active">
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
        <img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/cryptofr-comments.svg" alt="add emojis" class="icon inactive">
      </div>
    </div>
  </div>
</div>
