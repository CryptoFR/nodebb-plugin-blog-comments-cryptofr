<!-- IF isValid -->
	<div class="gifs-box">
		<div class="gif-header">
			<h4>Insert GIF</h4>
			<i class="fa fa-close close-gif"></i>
		</div>
		<div id="gifs-list"></div>
		<input class="gif-search">
	</div>
	<div class="upload-form">
		<form enctype="multipart/form-data" id="formupload" method="post" action="/api/post/upload">
	        <input  type="file" id="file" name="file"/>
	    </form> 
    </div>
    
	<!-- <div class="top-tool-box">
		<a href="" class='need-more-share2'
		    data-shareUrl='{redirect_url}'
		    title="Share">
			<i class="i-share icon-share" aria-hidden="true"></i>
		</a>

		<a data-component="post/bookmark" style="color: inherit; text-decoration: none;" title="Mark">
			<i class="i-bookmark icon-bookmark"></i>
		</a>
		<a data-component="post/upvote" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Upvote">
			<i class="i-upvote icon-thumbs-up-alt"></i>
			<span class="upvote-count">
			</span>
		</a>
		<a data-component="post/downvote" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Downvote">
			<i class="i-downvote icon-thumbs-down-alt"></i>
			<span class="downvote-count">
			</span>
		</a>
	</div> -->

	<!-- TOP BAR: sorting comments, login, menu -->
	<div class="sortbar">
		<div class="postCounts" data-postcount="{postCount}">
			<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/comments.svg" alt="{postCount} commentaires" class="icon">
			<span class="posts-count">{postCount}</span> commentaires
	    <ul class="sort-wrapper sort-group">
	      <li class="sort-by">Classer par</li>
	      <li class="selected-sorting">
	      	nouveaux commentaires
	      	<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/angle-down.svg" alt="Select sorting" class="icon">
	      	<ul class="select-sorting">
		      	<li class="sort-group-link"><a data-component="sort/best">meilleurs commentaires</a></li>
		      	<li class="sort-group-link"><a data-component="sort/newest">nouveaux commentaires</a></li>
		      	<li class="sort-group-link"><a data-component="sort/oldest">anciens commentaires</a></li>
		      </ul>
	      </li>
	    </ul>
		</div>
		<div class="user-menu">
			<!-- IF !isLoggedIn -->
				<form action="{relative_path}/comments/reply" class="top-post-form clearfix" method="post">
				</form>
				<a class="login-link" id="nodebb-login">Se connecter</a>
			<!-- ELSE -->
			 	TEST

				<!-- IF userTest -->
				<img data-uid="{user.uid}" src="{user.picture}" class="profile-image" title="{user.username}" />
				<span class="user-status user-status-main {user.status}"></span>
				<!-- ENDIF userTest -->

				TEST2
				<!-- IF userNoPicture -->
				<div class="profile-image" style="background-color: {user.icon:bgColor};" title="{user.username}">{user.icon:text}</div>
				<span class="user-status user-status-main {user.status}"></span>
				<!-- ENDIF userNoPicture -->
				
				<!-- TEST -->
				<ul class="user-options">
	      	<li class="sort-group-link logout-box"><i class="fa fa-sign-out"></i>Déconnexion</li>
	      </ul>
			<!-- ENDIF !isLoggedIn -->
		</div>
	</div>

	<!-- IF atTop -->
	<div class="topic-profile-pic user first-image">
		<!-- IF !isLoggedIn -->
			<!-- <img src="https://1.gravatar.com/avatar/177d180983be7a2c95a4dbe7451abeba?s=95&d=&r=PG" class="profile-image" /> -->
		<!-- ELSE -->
			<i component="user/status" class="fa fa-circle status online" title="En ligne" data-original-title="En ligne" ></i>
			<!-- IF user.picture.length -->
			<img data-uid="{user.uid}" src="{user.picture}" class="profile-image" title="{user.username}" />
			<!-- ELSE -->
			<div class="profile-image" style="background-color: {user.icon:bgColor};" title="{user.username}">{user.icon:text}</div>
			<!-- ENDIF user.picture.length -->
			<span class="user-status user-status-main {user.status}"></span>
		<!-- ENDIF !isLoggedIn -->
	</div>

	<!-- IF isLoggedIn -->
		<form action="{relative_path}/comments/reply" class="logged-in top-post-form clearfix" method="post">
			<!-- <small class="logged-as">Connecté en tant que <strong>{user.username}</strong>. <strong class="nodebb-error"></strong></small> -->
			<textarea id="nodebb-content" class="form-control comment-box" name="content" placeholder="Rejoignez la discussion" rows="3" data-emojiable="true"></textarea>
			<div class="comments-toolbar">
				<div class="special-box actions">
					<span class="special-action emojis icon">
						<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/emojis.svg" alt="add emojis" class="icon inactive">
						<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/emojis.svg" alt="add emojis" class="icon active">
					</span> 
					<span class="special-action gif">
						<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">
						<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">
					</span>
					<span class="special-action img">
						<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/image.svg" alt="upload image" class="icon inactive">
						<img src="{relative_path}/plugins/nodebb-plugin-blog-comments-cryptofr/icons/image-active.svg" alt="upload image" class="icon active">
					</span>
				</div>
				<button class="btn btn-primary">Répondre</button>
			</div>
			<input type="hidden" name="_csrf" value="{token}" />
			<input type="hidden" name="tid" value="{tid}" />
			<input type="hidden" name="url" value="{redirect_url}" />
			<!-- <div class="logout-box">
				<i class="fa fa-sign-out"></i>
				<span>Déconnexion</span>
			</div> -->
		</form>
		<!-- ELSE -->
		<form action="{relative_path}/comments/reply" class="top-post-form clearfix" method="post">
		</form>
		<div class="buttons-container" id="buttons-container" >
			<button class="btn btn-primary" id="nodebb-login">Se connecter</button>
		</div>

		<!-- This button is here just for making the css margin right -->
		<button style="visibility: hidden; padding-top: 8px;"> </button>
		<!-- ENDIF isLoggedIn -->
	<!-- ENDIF atTop -->

	<ul id="nodebb-comments-list" data-mainpid="{mainPost.pid}">
		<!-- BEGIN posts -->
		<li class="nodebb-post-fadein" data-pid="{posts.pid}">
			<div class="topic-item" data-pid="{posts.pid}" data-userslug="{user.userslug}" data-uid="{posts.uid}">
				<div class="topic-body">
					<div class="topic-profile-pic">
						<a href="{relative_path}/user/{user.userslug}">
							<!-- IF user.picture.length -->
							<img src="{user.picture}" alt="{user.username}" class="profile-image" title="{user.username}">
							<!-- ELSE -->
							<div class="profile-image" style="background-color: {user.icon:bgColor}" title="{user.username}" alt="{user.username}">{user.icon:text}</div>
							<!-- ENDIF user.picture -->
						</a>
					</div>
					<div class="topic-text">
						<div class="post-content" itemprop="text">
							<small>
								<a href="{relative_path}/user/{user.userslug}" style="color: inherit; text-decoration: none;"><strong data-strong-username="">{user.username}</strong></a>
								<span class="post-time" data-timestamp="" title="{posts.timestampISO}"> {posts.timestamp}</span>
								<!-- IF posts.isReply -->
								<!-- IF !posts.deletedReply -->
									<button data-component="post/parent" class="reply-label no-select" data-topid="{posts.toPid}">
										<i class="icon-reply"></i> @{posts.parentUsername}
									</button>
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
									<i class="i-upvote <!-- IF posts.upvoted --> icon-thumbs-up-alt <!-- ELSE --> icon-thumbs-up <!-- ENDIF posts.upvoted -->"></i>
									<span class="upvote-count <!-- IF !posts.votes --> hidden <!-- ENDIF !posts.votes -->">
										{posts.votes}
									</span>
								</a>
								<a data-component="post/downvote" data-pid="{posts.pid}" data-downvoted="{posts.downvoted}" data-votes="{posts.votes}" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Downvote">
									<i class="i-downvote <!-- IF posts.downvoted --> icon-thumbs-down-alt <!-- ELSE --> icon-thumbs-down <!-- ENDIF posts.downvoted -->"></i>
								</a>
								<span class="post-value">
									{posts.votes} points
								</span>
								<!-- <a data-component="post/quote"><i class="fa fa-quote-left"></i> quote</a> -->
							</div>
						</div>
					</div>
				</div>

				<form action="{relative_path}/comments/reply" method="post" class="sub-reply-input hidden">
 					<textarea id="nodebb-content" class="form-control" name="content" placeholder="Répondre" rows="3" data-emojiable="true"></textarea>
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
 				</form>
        <div data-recursive-replies=""></div>
      </div>
		</li>
		<!-- END posts -->
	</ul>

	<!-- IF atBottom -->
		<div class="topic-profile-pic user">
			<!-- IF isLoggedIn -->
			<img src="{user.picture}" class="profile-image" />
			<!-- ELSE -->
			<img src="http://1.gravatar.com/avatar/177d180983be7a2c95a4dbe7451abeba?s=95&d=&r=PG" class="profile-image" />
			<!-- ENDIF isLoggedIn -->
		</div>
		<form action="{relative_path}/comments/reply" method="post">
			<textarea id="nodebb-content" class="form-control" name="content" placeholder="Join the conversation" rows="3" data-emojiable="true" data-emojiable="true"></textarea>
		<!-- IF isLoggedIn -->
			<small>Connecté comme <strong>{user.username}</strong>. <strong class="nodebb-error"></strong></small>
			<button class="btn btn-primary">Répondre</button>
			<input type="hidden" name="_csrf" value="{token}" />
			<input type="hidden" name="tid" value="{tid}" />
			<input type="hidden" name="url" value="{redirect_url}" />
		</form>
		<!-- ELSE -->
		</form>
		<button class="btn btn-primary" id="nodebb-login">Se connecter</button>

		<!-- This button is here just for making the css margin right -->
		<button style="visibility: hidden; padding-top: 8px;"> </button>

		<!-- ENDIF isLoggedIn -->
	<!-- ENDIF atBottom -->

	<small class="nodebb-copyright">Commentaires avec <a href="{relative_path}" target="_blank">{siteTitle}</a> &bull; <a href="{relative_path}/topic/{tid}">Topic originel</a></small>
	<button class="btn btn-primary" id="nodebb-load-more">Charger plus de commentaires...</button>

	
<!-- ELSE -->
	<div class="no-topic">
		<a href="{relative_path}" target="_blank">{siteTitle}</a>
		<p>Les commentaires sont désactivés.</p>
	</div>
<!-- ENDIF isValid -->
