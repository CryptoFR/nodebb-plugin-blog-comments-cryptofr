/******* UPLOAD FILES *******/

export function uploadInit(){
  $(document).on('click','.special-action.img', function(){
    $("#formupload #file").trigger("click");
  });

	$("#formupload #file").on("change", function (e) {
    e.preventDefault();
    var formData = new FormData(document.querySelector("#formupload"));
    formData.append('img', $(this)[0].files[0]);

    console.log("formData");
    console.log(formData.get('file'))

    // api to post image

      // return path string ![] and write it on the textarea/wysiwig

      // uploadContentCheck()
  });        

}

export function uploadContentCheck(){

}