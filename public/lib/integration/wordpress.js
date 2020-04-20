export function checkIfWpAdmin(){

	if (window.location.href.indexOf("cryptofr_comments_plugin") > -1) {
		return true;
	}
	return false;
}