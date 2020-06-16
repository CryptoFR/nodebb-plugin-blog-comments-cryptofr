<div id="register-modal" class="modal" data-closed="1">
  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-header-first-row">
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-header-title-wrapper">
        <h3 class="modal-header-title">Vous devez être membre pour commenter, juste quelques secondes de plus</h3>
      </div>
    </div>
    <div class="modal-body clearfix">
      <div class="modal-col">
        <h4 class="modal-subtitle">S'inscrire</h4>
        <form action="#" id="register-form" method="POST">
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
            <span>J'ai lu les termes et conditions</span>
          </div>
          <div id="google-callback"></div>
          <button class="modal-button" type="submit">Register</button>
        </form>
      </div>
      <div class="modal-col">
        <h4 class="alt-acc">Accès alternatif</h4>
        <ul class="alt-logins">
                
          <li class="twitter"><a rel="nofollow noopener noreferrer" target="_top" data-link="{nodeBBURL}/auth/twitter" href="#" data-network="Twitter"><i class="fa fa-twitter-square fa-2x"></i></a></li>
          
          <li class="google"><a rel="nofollow noopener noreferrer" target="_top" data-link="{nodeBBURL}/auth/google" href="#" data-network="Google"><i class="fa fa-google-plus-square fa-2x"></i></a></li>
          
          <li class="github"><a rel="nofollow noopener noreferrer" target="_top" data-link="{nodeBBURL}/auth/github" href="#" data-network="Github"><i class="fa fa-github fa-2x"></i></a></li>
                
        </ul>
      </div>
    </div>
  </div>

</div>
