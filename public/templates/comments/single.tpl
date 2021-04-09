<li data-pid="{posts.pid}"> 
  <div class="topic-item" data-pid="{posts.pid}" data-userslug="{user.userslug}" data-uid="{posts.uid}">
    <div class="topic-body">
      <div class="topic-profile-pic">
        <a href="{relative_path}/user/{user.userslug}">
        <!-- IF user.picture.length -->
        <img src="" alt="{user.username}" class="profile-image" title="{user.username}">
        <!-- ELSE -->
        <div class="profile-image" style="background-color: {user.icon:bgColor}" title="{user.username}" alt="{user.username}">{user.icon:text}</div>
        <!-- ENDIF user.picture -->
        </a>
        <span class="user-status user-status-comments online"></span> 
      </div>
      <div class="topic-text">
        <div class="post-content" itemprop="text">
          <small>
            <a href="{relative_path}/user/{user.userslug}" class="username" style="color: inherit; text-decoration: none;"><span data-strong-username="">{user.username}</span></a>
            <div class="badges"></div>
            <span class="post-time" data-timestamp="" title="{posts.timestampISO}">{posts.timestamp}</span>
            <!-- IF posts.isReply -->
            <!-- IF !posts.deletedReply -->
            <button data-component="post/parent" class="reply-label no-select" data-topid="{posts.toPid}">
              <i class="icon-reply"></i> <span data-parent-username="">@{posts.parentUsername}</span>
            </button>
            <!-- ENDIF !posts.deletedReply -->
            <!-- ENDIF posts.isReply -->
            <div class="menuButton-container">
              <span class="menuButton"><i class="fad fa-caret-down"></i></span>
              <div class="options-container">
                <span class="edit-option"><i class="fad fa-edit"></i> Éditer</span>
                <span class="delete-option"><i class="fad fa-trash"></i> Supprimer</span>
              </div>
            </div>
          </small>
          
          <div class="post-body" content="{posts.content}">{posts.content}</div>
          <div class="nodebb-post-tools post-tools no-select">
            <a class="upvote" data-component="post/upvote" data-pid="{posts.pid}" data-upvoted="true" data-votes="0" title="Upvote">
              <i class="i-upvote fad fa-angle-up"></i>
              <span class="upvote-count" style="display: none;">
                {posts.votes}
              </span>
            </a>
            <div class="posts-vote">
              <span class="post-value">{posts.votes}</span>
            </div>
            <a class="downvote" data-component="post/downvote" data-pid="{posts.pid}" data-downvoted="true" data-votes="0" title="Downvote">
              <i class="i-downvote fad fa-angle-down"></i>
            </a>
            <a class="reply" data-component="post/reply" class="reply" title="Reply">
              <i class="fad fa-reply"></i>
              <span class="text">Répondre</span>
            </a>
            <a class="quote" data-component="post/quote" class="quote" title="Quote">
              <i class="fad fa-quote-right"></i>
              <span class="text">Citer</span>
            </a>
            <!-- <a class="award" title="Award">
            <i class="fad fa-trophy"></i>
            <span class="text">Tip</span>
            </a> -->
            <a data-component="post/delete" class="delete" style="color: inherit; text-decoration: none;display: none;" title="Quote">
              Effacer
            </a>
            <a data-component="post/edit" class="edit" style="color: inherit; text-decoration: none;display: none;" title="Edit">
              Éditer
            </a>
            <!-- <a data-component="post/bookmark" data-bookmarked="{posts.bookmarked}" style="color: inherit; text-decoration: none;" title="Mark">
            <i class="i-bookmark icon-bookmark icon-bookmark-empty"></i>
            </a> -->
          </div>
        </div>
      </div>
    </div>

    <form action="{relative_path}/comments/reply" method="post" class="sub-reply-input hidden">
      <strong class="nodebb-error"></strong>
      <textarea  class="form-control" name="content" placeholder="Ecrire une réponse" rows="5" data-emojiable="true"></textarea>
      <div class="comments-toolbar">
        <div class="special-box">
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
            <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">
            <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">
          </span> 
          <span class="special-action img">
            <i class="fad fa-image"></i>
          </span>
        </div>
        <button data-reply-button="" class="submit-comment btn btn-primary" type="submit">Répondre à XXX</button>
      </div>
      <input type="hidden" name="_csrf" value="{token}" />
      <input type="hidden" name="tid" value="{tid}" />
      <input type="hidden" name="toPid" value="{posts.pid}" />
      <input type="hidden" name="url" value="{redirect_url}" />
    </form>
    <form action="{relative_path}/comments/edit/" method="post" class="sub-edit-input hidden" data-pid="{pid}">
      <strong class="nodebb-error"></strong>
      <textarea  class="form-control" name="content" placeholder="Edit" rows="3" data-emojiable="true"></textarea>
      <div class="comments-toolbar">
        <div class="special-box">
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
            <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">
            <img src="" data-src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">
          </span> 
          <span class="special-action img">
            <i class="fad fa-image"></i>
          </span>
        </div>
        <button data-reply-button="" class="submit-comment btn btn-primary" type="submit">Éditer</button>
      </div>
      <input type="hidden" name="_csrf" value="{token}" />
      <input type="hidden" name="tid" value="{tid}" />
      <input type="hidden" name="url" value="{redirect_url}" />
    </form>
    <div data-recursive-replies=""></div>
  </div>
</li>
