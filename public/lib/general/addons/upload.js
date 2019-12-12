function generateUUID(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0;
		var v = c === 'x' ? r : ((r & 0x3) | 0x8);
		return v.toString(16);
	});
}


export function uploadInit(){
	for (let icon of document.querySelectorAll(".special-action.img")) {
		icon.addEventListener('click', function(event){
		    $("#formupload #file").attr("focused","1");
		    $("#formupload #file").trigger("click");
		});
	}

	$("#formupload #file").on("change", function (e) {
	            e.preventDefault();
	            var formData = new FormData(document.getElementById("formupload"));
	            // formData.append(f.attr("name"), $(this)[0].files[0]);
	            
	            console.log(formData)
	            $.ajax({
	                url: nodeBBURL + "/api/post/upload",
	                type: "post",
	                data: formData,
	                cache: false,
	                contentType: false,
		     		processData: false,
		     		resetForm: true,
		     		clearForm: true,
		     		formData: formData
	            })
	                .done(function(res){
	                    console.log(res);
	                });
	        });
}
