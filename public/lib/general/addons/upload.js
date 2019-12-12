function generateUUID(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0;
		var v = c === 'x' ? r : ((r & 0x3) | 0x8);
		return v.toString(16);
	});
}

export function uploadInit(){

	document.querySelector(".special-action.img").addEventListener('click', function(event){
	    var event = document.createEvent('HTMLEvents');
	    event.initEvent('click', true, false);
	    document.querySelector("#formupload #file").dispatchEvent(event);
	});
	    
	$("#formupload #file").on("change", function (t) {
		var r = (t.target || {}).files || ($(this).val() ? [{
			name: $(this).val(),
			type: $(this).val().substring($(this).val().lastIndexOf('.')
		}] : null);
		if (r) {
			// c({
			// 	files: r,
			// 	post_uuid: generateUUID,
			// 	route: "/api/post/upload"
			// })
			console.log(r)
			console.log(generateUUID)
		}
	});


	// $(function(){
	//         $("#formuploadajax").on("submit", function(e){
	//             e.preventDefault();
	//             var f = $(this);
	//             var formData = new FormData(document.getElementById("formuploadajax"));
	//             formData.append("dato", "valor");
	//             //formData.append(f.attr("name"), $(this)[0].files[0]);
	//             $.ajax({
	//                 url: "recibe.php",
	//                 type: "post",
	//                 dataType: "html",
	//                 data: formData,
	//                 cache: false,
	//                 contentType: false,
	// 	     processData: false
	//             })
	//                 .done(function(res){
	//                     $("#mensaje").html("Respuesta: " + res);
	//                 });
	//         });
	//     });
}
