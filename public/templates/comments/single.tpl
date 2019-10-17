
		<li data-pid="{posts.pid}" attr-test="test">
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
            <span class="user-status user-status-comments"></span>
					</div>
					<div class="topic-text">
						<div class="post-content" itemprop="text">
							<small>
								<a href="{relative_path}/user/{user.userslug}" class="username" style="color: inherit; text-decoration: none;"><strong data-strong-username="">{user.username}</strong></a>
								<span class="post-time" data-timestamp="" title="{posts.timestampISO}">{posts.timestamp}</span>
								<!-- IF posts.isReply -->
								<!-- IF !posts.deletedReply -->
									<button data-component="post/parent" class="reply-label no-select" data-topid="{posts.toPid}">
										<i class="icon-reply"></i> <span data-parent-username="">@{posts.parentUsername}</span>
									</button>
								<!-- ENDIF !posts.deletedReply -->
								<!-- ENDIF posts.isReply -->
							</small>
							<br />
							<div class="post-body">{posts.content}</div>
							<div class="nodebb-post-tools post-tools no-select">
								<a data-component="post/upvote" data-pid="{posts.pid}" data-upvoted="{posts.upvoted}" data-votes="{posts.votes}" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Upvote">
									<i class="i-upvote icon-thumbs-up-alt icon-thumbs-up"></i>
									<span class="upvote-count" style="display: none;">
										{posts.votes}
									</span>
								</a>
								<a data-component="post/downvote" data-pid="{posts.pid}" data-downvoted="{posts.downvoted}" data-votes="{posts.votes}" style="color: inherit; text-decoration: none; margin-right: 5px;" title="Downvote">
									<i class="i-downvote icon-thumbs-down-alt icon-thumbs-down"></i>
								</a>
								<div class="posts-vote">
									<span class="post-value">{posts.votes}</span> points
								</div>
								<a data-component="post/reply" class="reply" style="color: inherit; text-decoration: none;" title="Reply">
									Répondre
								</a>
								<a data-component="post/quote" class="quote" style="color: inherit; text-decoration: none;" title="Quote">
									Citer
								</a>
								<a data-component="post/edit" class="edit" style="color: inherit; text-decoration: none;" title="Edit">
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
 					<textarea id="nodebb-content" class="form-control" name="content" placeholder="Join the conversation" rows="3"></textarea>
 					<div class="comments-toolbar">
						<button data-reply-button="" class="btn btn-primary" type="submit">Répondre à {user.username}</button>
					</div>
 					<input type="hidden" name="_csrf" value="{token}" />
 					<input type="hidden" name="tid" value="{tid}" />
 					<input type="hidden" name="toPid" value="{posts.pid}" />
 					<input type="hidden" name="url" value="{redirect_url}" />
 				</form>
				<form action="{relative_path}/comments/edit/" method="post" class="sub-edit-input hidden" data-pid="{pid}">
 					<textarea id="nodebb-content" class="form-control" name="content" placeholder="Edit" rows="3"></textarea>
 					<div class="comments-toolbar">
						<button data-reply-button="" class="btn btn-primary" type="submit">Éditer</button>
					</div>
 					<input type="hidden" name="_csrf" value="{token}" />
 					<input type="hidden" name="tid" value="{tid}" />
 					<input type="hidden" name="url" value="{redirect_url}" />
 				</form>
        <div data-recursive-replies=""></div>
      </div>
		</li>
