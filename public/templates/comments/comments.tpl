<!-- IF isValid -->
	<!-- <div class="top-tool-box">
		<a href="" class='need-more-share2'
		    data-shareUrl='{redirect_url}'
		    title="Share"
		>
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
	<!-- IF atTop -->
		<div class="topic-profile-pic user first-image">

			<!-- IF !isLoggedIn -->
				<!-- <img src="https://1.gravatar.com/avatar/177d180983be7a2c95a4dbe7451abeba?s=95&d=&r=PG" class="profile-image" /> -->
			<!-- ELSE -->
				<!-- IF user.picture -->
				<i component="user/status" class="fa fa-circle status online" title="En ligne" data-original-title="En ligne"></i>
				<img data-uid="{user.uid}" src="{user.picture}" class="profile-image" title="{user.username}" />
				<span class="user-status {user.status}"></span>
				<!-- ELSE -->
				<div class="profile-image" style="background-color: {user.icon:bgColor};" title="{user.username}">{user.icon:text}</div>
				<span class="user-status {user.status}"></span>
				<!-- ENDIF user.picture -->
			<!-- ENDIF !isLoggedIn -->
		</div>

		<!-- IF isLoggedIn -->
		<form action="{relative_path}/comments/reply" class="logged-in top-post-form clearfix" method="post">
			<small class="logged-as">Connecté en tant que <strong>{user.username}</strong>. <strong id="nodebb-error"></strong></small>
			<textarea id="nodebb-content" class="form-control" name="content" placeholder="Rejoignez la discussion" rows="3"></textarea>
			<div class="comments-toolbar">
				<button class="btn btn-primary">Répondre</button>
			</div>
			<input type="hidden" name="_csrf" value="{token}" />
			<input type="hidden" name="tid" value="{tid}" />
			<input type="hidden" name="url" value="{redirect_url}" />
		</form>
		<!-- ELSE -->
		<form action="{relative_path}/comments/reply" class="top-post-form clearfix" method="post">
		</form>
		<button class="btn btn-primary" id="nodebb-register">S'enregister</button>
		<button class="btn btn-primary" id="nodebb-login">Se connecter</button>

		<!-- This button is here just for making the css margin right -->
		<button style="visibility: hidden; padding-top: 8px;"> </button>

		<!-- ENDIF isLoggedIn -->
	<!-- ENDIF atTop -->

	<div class="sortbar">
		<div class="postCounts" data-postcount="{postCount}">
			<img src="https://i.gyazo.com/2880209dbbf7a5ebc1c1daadfa958f97.png" alt="{postCount} commentaires" class="icon"> 
			<span class="posts-count">{postCount}</span> commentaires
		</div>
	</div>

	<ul id="nodebb-comments-list" data-mainpid="{mainPost.pid}">
		<!-- BEGIN posts -->
		<li <!-- IF pagination --> class="nodebb-post-fadein" <!-- ENDIF pagination --> <!-- IF !posts.index --> class="nodebb-post-fadein" <!-- ENDIF !posts.index --> data-pid="{posts.pid}">
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
								<span data-timestamp="" title="{posts.timestampISO}">commented {posts.timestamp}</span>
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
 					<textarea id="nodebb-content" class="form-control" name="content" placeholder="Join the conversation" rows="3"></textarea>
 					<button class="btn btn-primary">Reply to {user.username}</button>
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
			<textarea id="nodebb-content" class="form-control" name="content" placeholder="Join the conversation" rows="3"></textarea>
		<!-- IF isLoggedIn -->
			<small>Signed in as <strong>{user.username}</strong>. <strong id="nodebb-error"></strong></small>
			<button class="btn btn-primary">Post a Reply</button>
			<input type="hidden" name="_csrf" value="{token}" />
			<input type="hidden" name="tid" value="{tid}" />
			<input type="hidden" name="url" value="{redirect_url}" />
		</form>
		<!-- ELSE -->
		</form>
		<button class="btn btn-primary" id="nodebb-register">Register</button>
		<button class="btn btn-primary" id="nodebb-login">Login</button>

		<!-- This button is here just for making the css margin right -->
		<button style="visibility: hidden; padding-top: 8px;"> </button>

		<!-- ENDIF isLoggedIn -->
	<!-- ENDIF atBottom -->

	<small class="nodebb-copyright">Powered by <a href="{relative_path}" target="_blank">{siteTitle}</a> &bull; <a href="{relative_path}/topic/{tid}">View original thread</a></small>
	<button class="btn btn-primary" <!-- IF !posts.length -->style="display: none"<!-- ENDIF !posts.length --> id="nodebb-load-more">Load more comments...</button>
<!-- ELSE -->
	{siteTitle} Commenting has been disabled.
	<!-- IF isAdmin -->
	<form action="{relative_path}/comments/publish" method="post">
		<button class="btn btn-primary">Publish this article to {siteTitle}</button>
		<input type="hidden" name="markdown" id="nodebb-content-markdown" />
		<input type="hidden" name="title" id="nodebb-content-title" />
		<input type="hidden" name="cid" id="nodebb-content-cid" />
		<input type="hidden" name="blogger" id="nodebb-content-blogger" />
		<input type="hidden" name="tags" id="nodebb-content-tags" />
		<input type="hidden" name="id" value="{article_id}" />
		<input type="hidden" name="url" value="{redirect_url}" />
		<input type="hidden" name="_csrf" value="{token}" />
	</form>
	<!-- ENDIF isAdmin -->
<!-- ENDIF isValid -->
