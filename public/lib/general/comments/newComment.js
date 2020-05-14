import { set,pluginURL,page,commentXHR,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate, wholeTemplate,renderedCaptcha,templates,reload, dataRes,firstTime } from "../../settings.js";
import { getCurrentDate } from "../util.js"; 

export function parseNewComment(post,user,token,tid){
  let newComment= /*'<li data-pid="'+post.pid+'">'+*/
                    '<div class="topic-item" data-pid="'+post.pid+'" data-userslug="'+user.userslug+'" data-uid="'+post.uid+'">'+
                      '<div class="topic-body">'+
                        '<div class="topic-profile-pic">'+
                          '<a href="'+dataRes.relative_path+'/user/'+user.userslug+'">';  
                          if (user.picture.length){
               newComment+= '<img src="'+user.picture+'" alt="'+user.username+'" class="profile-image" title="'+user.username+'">';
                          }else{
               newComment+= '<div class="profile-image" style="background-color: '+user['icon:bgColor']+'" title="'+user.username+'" alt="'+user.username+'">'+user['icon:text']+'</div>';
                          } 
             newComment+= '</a>'+
                          '<span class="user-status user-status-comments"></span>'+
                        '</div>'+
                        '<div class="topic-text">'+
                          '<div class="post-content" itemprop="text">'+
                            '<small>'+
                              '<a href="'+dataRes.relative_path+'/user/'+user.userslug+'" class="username" style="color: inherit; text-decoration: none;"><span data-strong-username="">'+user.username+'</span></a>'+
                              "<span class='post-time' data-timestamp='' title='"+getCurrentDate()+"'>à l'instant</span>";
                              if (post.isReply){
                   newComment+= '<button data-component="post/parent" class="reply-label no-select" data-topid="'+post.toPid+'">'+
                                '<i class="icon-reply"></i> <span data-parent-username="">@'+post.parentUsername+'</span>'+
                              '</button>';
                              }
                   newComment+= '<div class="menuButton-container">'+
                                '<span class="menuButton"><i class="fad fa-caret-down"></i></span>'+
                                '<div class="options-container">'+
                                  '<span class="edit-option"><i class="fad fa-edit"></i> Éditer</span>'+
                                  '<span class="delete-option"><i class="fad fa-trash"></i> Supprimer</span>'+
                                '</div>'+
                              '</div>'+
                            '</small>'+
                            '<div class="post-body" content="'+post.content+'">'+post.content+'</div>'+
                            '<div class="nodebb-post-tools post-tools no-select">'+
                              '<a class="upvote disabled" data-component="post/upvote" data-pid="'+post.pid+'" data-upvoted="false" data-votes="0" title="Upvote">'+
                                '<i class="i-upvote fad fa-angle-up"></i>'+
                                '<span class="upvote-count" style="display: none;">0</span>'+
                              '</a>'+
                              '<div class="posts-vote">'+
                                '<span class="post-value">0</span>'+
                              '</div>'+
                              '<a class="downvote disabled" data-component="post/downvote" data-pid="'+post.pid+'" data-downvoted="false" data-votes="0" title="Downvote">'+
                                '<i class="i-downvote fad fa-angle-down"></i>'+
                              '</a>'+
                              '<a class="reply" data-component="post/reply" class="reply" title="Reply">'+
                                '<i class="fad fa-reply"></i>'+
                                '<span class="text">Répondre</span>'+
                              '</a>'+
                              '<a class="quote" data-component="post/quote" class="quote" title="Quote">'+
                                '<i class="fad fa-quote-right"></i>'+
                                '<span class="text">Citer</span>'+
                              '</a>'+
                              '<a data-component="post/delete" class="delete" style="color: inherit; text-decoration: none;display: none;" title="Quote">'+
                                'Effacer'+
                              '</a>'+
                              '<a data-component="post/edit" class="edit" style="color: inherit; text-decoration: none;display: none;" title="Edit">'+
                                'Éditer'+
                              '</a>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<form action="'+dataRes.relative_path+'/comments/reply" method="post" class="sub-reply-input hidden">'+
                        '<strong class="nodebb-error"></strong>'+
                        '<textarea id="" class="form-control" name="content" placeholder="Ecrire une réponse" rows="5" data-emojiable="true"></textarea>'+
                        '<div class="comments-toolbar">'+
                          '<div class="special-box">'+
                            '<span class="special-action emojis">'+
                              '<i class="fad fa-smile"></i>'+
                            '</span>'+
                            '<span class="special-action gif">'+
                              '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">'+
                              '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">'+
                            '</span>'+
                          '</div>'+
                          '<button data-reply-button="" class="submit-comment btn btn-primary" type="submit">Répondre à XXX</button>'+
                        '</div>'+
                        '<input type="hidden" name="_csrf" value="'+token+'" />'+
                        '<input type="hidden" name="tid" value="'+tid+'" />'+
                        '<input type="hidden" name="toPid" value="'+post.pid+'" />'+
                        '<input type="hidden" name="url" value="'+dataRes.redirect_url+'" />'+
                      '</form>'+
                      '<form action="'+dataRes.relative_path+'/comments/edit/'+post.pid+'" method="post" class="sub-edit-input hidden" data-pid="'+post.pid+'">'+
                        '<strong class="nodebb-error"></strong>'+
                        '<textarea id="" class="form-control" name="content" placeholder="Edit" rows="3" data-emojiable="true"></textarea>'+
                        '<div class="comments-toolbar">'+
                          '<div class="special-box">'+
                            '<span class="special-action emojis">'+
                              '<i class="fad fa-smile"></i>'+
                            '</span>'+
                            '<span class="special-action gif">'+
                              '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif.svg" alt="add gif" class="icon inactive">'+
                              '<img src="https://testforum.cryptofr.com/plugins/nodebb-plugin-blog-comments-cryptofr/icons/gif-active.svg" alt="add gif" class="icon active">'+
                            '</span>'+
                          '</div>'+
                          '<button data-reply-button="" class="submit-comment btn btn-primary" type="submit">éditer</button>'+
                        '</div>'+
                        '<input type="hidden" name="_csrf" value="'+token+'" />'+
                        '<input type="hidden" name="tid" value="'+tid+'" />'+
                        '<input type="hidden" name="url" value="'+dataRes.redirect_url+'" />'+
                      '</form>'+
                      '<div data-recursive-replies=""></div>'+
                    '</div>'+
                  '</li>'+
                  '<div data-recursive-replies=""></div>'+
                '</div>'
              /*'</li>'*/;

              return newComment;

}