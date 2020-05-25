export var timestamp,firstTime,activeUserComments,commentData,gifCommentBox,dataRes,commentXHR,reloading,page,pluginURL,voteXHR,authXHR,bookmarkXHR,signUpXHR,sorting,postData,pagination,XHR,commentsURL,savedText,nodebbDiv,contentDiv,commentsDiv,commentsCounter,commentsAuthor,commentsCategory,articlePath,postTemplate,wholeTemplate,renderedCaptcha,templates,reload;

commentData=[];
activeUserComments=[];

export var set = {
	commentData: commentDataVal,
	pluginURL : pluginURLVal,
	voteXHR : voteXHRVal,
	authXHR : authXHRVal,
	commentXHR : commentXHRVal,
	signUpXHR : signUpXHRVal,
	bookmarkXHR : bookmarkXHRVal,
	sorting : sortingVal,
	postData : postDataVal,
	pagination : paginationVal,
	XHR : XHRVal,
	commentsURL : commentsURLVal,
	savedText : savedTextVal,
	nodebbDiv : nodebbDivVal,
	contentDiv : contentDivVal,
	commentsDiv : commentsDivVal,
	commentsCounter : commentsCounterVal,
	commentsAuthor : commentsAuthorVal,
	commentsCategory : commentsCategoryVal,
	articlePath : articlePathVal,
	postTemplate : postTemplateVal,
	wholeTemplate : wholeTemplateVal,
	renderedCaptcha : renderedCaptchaVal,
	templates : templatesVal,
	dataRes : dataResVal,
	page : pageVal,
	reloading : reloadingVal,
	gifCommentBox : gifCommentBoxVal,
	reload : reloadVal,
	firstTime : firstTimeVal,
	timestamp : timestampVal,
	activeUserComments: activeUserCommentsVal,
	activeUserCommentsReset: activeUserCommentsValReset
}
                                                         
function pluginURLVal( value ) { pluginURL = value; }
function voteXHRVal ( value ) { voteXHR = value; }
function authXHRVal( value ) { authXHR = value; }
function commentXHRVal( value ) { commentXHR = value; }
function signUpXHRVal( value ) { signUpXHR = value; }
function bookmarkXHRVal( value ) { bookmarkXHR = value; }
function sortingVal( value ) { sorting = value; }
function postDataVal( value ) { postData = value; }
function paginationVal( value ) { pagination = value; }
function XHRVal( value ) { XHR = value; }
function commentsURLVal( value ) { commentsURL = value; }
function savedTextVal( value ) { savedText = value; }
function nodebbDivVal( value ) { nodebbDiv = value; }
function contentDivVal( value ) { contentDiv = value; }
function commentsDivVal( value ) { commentsDiv = value; }
function commentsCounterVal( value ) { commentsCounter = value; }
function commentsAuthorVal( value ) { commentsAuthor = value; }
function commentsCategoryVal( value ) { commentsCategory = value; }
function articlePathVal( value ) { articlePath = value; }
function postTemplateVal( value ) { postTemplate = value; }
function wholeTemplateVal( value ) { wholeTemplate = value; }
function renderedCaptchaVal( value ) { renderedCaptcha = value; }
function templatesVal( value ) { templates = value; }
function dataResVal( value ) { dataRes = value; }
function pageVal( value ) { page = value; }
function reloadingVal( value ) { reloading = value; }
function gifCommentBoxVal( value ) { gifCommentBox = value; }
function reloadVal( value ) { reload = value; }
function firstTimeVal( value ) { firstTime = value; }
function commentDataVal(  value ) { commentData= value }
function timestampVal( value ) { timestamp = value }
function activeUserCommentsVal( value ) { activeUserComments.push(value) }
function activeUserCommentsValReset( value ) { activeUserComments=value }