<!-- IF isValid -->
<div class="gifs-box comments-enhancement-box">
  <div class="header draggable">
    <i class="fad fa-grip-lines"></i>
  </div>
  <div class="header-box">
    <span class="tab emoji-tab">Emojis</span>
    <span class="tab gif-tab selected">Gif</span>
    <i class="close-box close-gif far fa-times"></i>
  </div>
  <div class="emoji-selection">
    <div id="emoji-button"></div>
  </div>
  <div class="gif-selection">
    <input class="gif-search" />
    <div id="gifs-list"></div>
  </div>
</div>
<div class="upload-form">
  <div id="google-callback"></div>
  <form enctype="multipart/form-data" id="formupload" method="post" action="/api/post/upload">
    <input type="file" id="file" name="file" />
  </form>
</div>

<!-- TOP BAR: sorting comments, login, menu -- OK -->
<div class="sortbar">
  <div class="postCounts" data-postcount="{postCount}">
    <i class="fad fa-comments-alt"></i>
    <span class="posts-count">{postCount}</span> <span class="hide-mobile">commentaires</span>
    <ul class="sort-wrapper sort-group">
      <!-- <li class="sort-by">Classer par</li> -->
      <li class="selected-sorting">
        Classer par
        <i class="fad fa-chevron-down"></i>
        <ul class="select-sorting">
          <li class="sort-group-link"><a data-component="sort/best">meilleurs commentaires</a></li>
          <li class="sort-group-link"><a data-component="sort/newest">nouveaux commentaires</a></li>
          <li class="sort-group-link"><a data-component="sort/oldest">anciens commentaires</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="user-menu">
    <div class="loggedin-false">
      <a class="login-link" id="nodebb-login">Se connecter</a>
    </div>
    <div class="loggedin-true">
      <div class="userHasPicture">
        <img data-uid="{user.uid}" src="" data-src="{user.picture}" class="profile-image" title="{user.username}" />
        <span class="user-status user-status-main online"></span>
      </div>
      <div class="notUserHasPicture">
        <div
          class="profile-image"
          style="
            background-color: black;
          "
          title="{user.username}"
        >
          {user.icon:text}
        </div>
        <span class="user-status user-status-main online"></span>
      </div>
      <ul class="user-options">
        <li class="sort-group-link logout-box"><i class="fad fa-sign-out"></i> Déconnexion</li>
      </ul>
    </div>
  </div>
</div>
<!-- TOP BAR END -->

<!-- COMMENT BOX -- To FIX: image next to box, emojis, ... -->
<div class="loggedin-true">
  <div class="topic-profile-pic user first-image">
    <div class="userHasPicture">
      <img data-uid="{user.uid}" src="" data-src="{user.picture}" class="profile-image" title="{user.username}" />
      <span class="user-status user-status-main online"></span>
    </div>

    <div class="notUserHasPicture">
      <div
        class="profile-image"
        style="
          background-color: {
            user.icon: bgColor;
          }
        "
        title="{user.username}"
      >
        {user.icon:text}
      </div>
      <span class="user-status user-status-main letter-avatar online"></span>
    </div>
  </div>
  <form action="{relative_path}/comments/reply" class="logged-in top-post-form clearfix" method="post">
    <!-- <small class="logged-as">Connecté en tant que <strong>{user.username}</strong>.</small> -->
    <small><strong class="nodebb-error"></strong></small>
    <textarea class="form-control comment-box" name="content" placeholder="Rejoignez la discussion" rows="3" data-emojiable="true"></textarea>
    <div class="comments-toolbar">
      <div class="special-box actions">
        <span class="special-action bold">
          <i class="fad fa-bold"></i>
        </span>
        <span class="special-action italic">
          <i class="fad fa-italic"></i>
        </span>
        <span class="special-action emojis">
          <i class="fad fa-smile"></i>
        </span>
        <span class="special-action gif">
          <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive" />
          <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active" />
        </span>
        <span class="special-action img">
          <i class="fad fa-image"></i>
        </span>
      </div>
      <button class="submit-comment btn btn-primary"><span>Répondre</span><i class="fad fa-circle-notch fa-spin"></i></button>
    </div>
    <input type="hidden" name="_csrf" value="{token}" />
    <input type="hidden" name="tid" value="{tid}" />
    <input type="hidden" name="url" value="{redirect_url}" />
  </form>
</div>
<div class="loggedin-false">
  <form action="{relative_path}/comments/reply" class="logged-in top-post-form clearfix" method="post">
    <!-- <small class="logged-as">Connecté en tant que <strong>{user.username}</strong>.</small> -->
    <div class="guest-name-container">
      <label class="guest-name">Guest Name</label>
      <input name="name" class="guest-name-value" placeholder="Name" />
    </div>

    <small><strong class="nodebb-error"></strong></small>
    <textarea class="form-control comment-box" name="content" placeholder="Rejoignez la discussion" rows="3" data-emojiable="true"></textarea>
    <div class="comments-toolbar">
      <div class="special-box actions">
        <span class="special-action bold">
          <i class="fad fa-bold"></i>
        </span>
        <span class="special-action italic">
          <i class="fad fa-italic"></i>
        </span>
        <span class="special-action emojis">
          <i class="fad fa-smile"></i>
        </span>
        <span class="special-action gif">
          <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive" />
          <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active" />
        </span>
        <span class="special-action img">
          <i class="fad fa-image"></i>
        </span>
      </div>
      <button class="submit-comment btn btn-primary"><span>Répondre</span><i class="fad fa-circle-notch fa-spin"></i></button>
    </div>
    <input type="hidden" name="_csrf" value="{token}" />
    <input type="hidden" name="tid" value="{tid}" />
    <input type="hidden" name="url" value="{redirect_url}" />
  </form>
</div>
<!-- COMMENT BOX END -->

<div class="newer-comments" data-timestamp="">+<span class="new-comments-counter"></span></div>

<div class="load-more-div">
  <button id="nodebb-load-more" class="btn-primary btn">Charger plus de commentaires...</button>
</div>
<p class="load-more-text"></p>

<ul id="nodebb-comments-list" data-mainpid="{mainPost.pid}">
  <!-- BEGIN posts -->
  <li class="nodebb-post-fadein" data-pid="{posts.pid}">
    <div class="topic-item" data-pid="{posts.pid}" data-userslug="{user.userslug}" data-uid="{posts.uid}">
      <div class="topic-body">
        <div class="topic-profile-pic">
          <a href="{relative_path}/user/{user.userslug}">
            <!-- IF user.picture.length -->
            <img src="" data-src="{user.picture}" alt="{user.username}" class="profile-image" title="{user.username}" />
            <!-- ELSE -->
            <div
              class="profile-image"
              style="
                background-color: {
                  user.icon: bgColor;
                }
              "
              title="{user.username}"
              alt="{user.username}"
            >
              {user.icon:text}
            </div>
            <!-- ENDIF user.picture -->
          </a>
        </div>
        <div class="topic-text">
          <div class="post-content" itemprop="text">
            <small>
              <a href="{relative_path}/user/{user.userslug}" style="color: inherit; text-decoration: none;"><span data-strong-username="">{user.username}</span></a>
              <span class="post-time" data-timestamp="" title="{posts.timestampISO}"> {posts.timestamp}</span>
              <!-- IF posts.isReply -->
              <!-- IF !posts.deletedReply -->
              <button data-component="post/parent" class="reply-label no-select" data-topid="{posts.toPid}"><i class="icon-reply"></i> @{posts.parentUsername}</button>
              <!-- ENDIF !posts.deletedReply -->
              <!-- ENDIF posts.isReply -->
            </small>
            <br />
            <div class="post-body">{posts.content}</div>
            <div class="nodebb-post-tools post-tools no-select">
              <a data-component="post/reply" style="color: inherit; text-decoration: none;" title="Reply">
                <i class="icon-reply"></i>
              </a>
              <a data-component="post/quote" style="color: inherit; text-decoration: none;" title="Quote">
                <i class="icon-quote-right"></i>
              </a>
              <a data-component="post/bookmark" data-bookmarked="{posts.bookmarked}" style="color: inherit; text-decoration: none;" title="Mark">
                <i class="i-bookmark <!-- IF posts.bookmarked --> icon-bookmark <!-- ELSE --> icon-bookmark-empty <!-- ENDIF posts.bookmarked -->"></i>
              </a>
              <a data-component="post/upvote" data-pid="{posts.pid}" data-upvoted="{posts.upvoted}" data-votes="{posts.votes}" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Upvote">
                <i class="fad <!-- IF posts.upvoted --> fa-angle-up upvoted <!-- ELSE --> fa-angle-up <!-- ENDIF posts.upvoted -->"></i>
                <span class="upvote-count <!-- IF !posts.votes --> hidden <!-- ENDIF !posts.votes -->">
                  {posts.votes}
                </span>
              </a>
              <span class="post-value">
                {posts.votes} points
              </span>
              <a data-component="post/downvote" data-pid="{posts.pid}" data-downvoted="{posts.downvoted}" data-votes="{posts.votes}" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Downvote">
                <i class="fad <!-- IF posts.downvoted --> fa-angle-down downvoted <!-- ELSE --> fa-angle-down <!-- ENDIF posts.downvoted -->"></i>
              </a>
              <!-- <a data-component="post/quote"><i class="fa fa-quote-left"></i> quote</a> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaires de Posts -->
      <!-- <form action="{relative_path}/comments/reply" method="post" class="sub-reply-input hidden">
 					<textarea  class="form-control" name="content" placeholder="Répondre" rows="3" data-emojiable="true"></textarea>
 					<div class="comments-toolbar">
 						<div class="special-box">
 							<span class="special-action gif"><i class="fa fa-tenor-gif"></i></span>
	 						<span class="special-action img"><i class="fa fa-file-image-o"></i></span>
 						</div>
						<button data-reply-button="" class="btn btn-primary" type="submit">Répondre à {user.username}</button>
					</div>
 					<input type="hidden" name="_csrf" value="{token}" />
 					<input type="hidden" name="tid" value="{tid}" />
 					<input type="hidden" name="toPid" value="{posts.pid}" />
 					<input type="hidden" name="url" value="{redirect_url}" />
 				</form> -->
      <div data-recursive-replies=""></div>
    </div>
  </li>
  <!-- END posts -->
</ul>

<!-- ELSE -->
<div class="no-topic">
  <a href="{relative_path}" target="_blank">{siteTitle}</a>
  <p>Commentaires non actifs sur cet sujet.</p>
</div>
<!-- ENDIF isValid -->
