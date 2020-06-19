import { dataRes } from "../../settings.js";
import { fetchFile } from "../api.js";

/******* UPLOAD FILES *******/

export function uploadInit(){
  $(document).on('click','.special-action.img', function(){
    $("#formupload #file").trigger("click");
  });
	$("#formupload #file").on("change", function (e) {
    e.preventDefault();
    var formData = new FormData(document.querySelector("#formupload"));
    formData.append('files[0]', $(this)[0].files[0]);
    formData.append('cid', dataRes.category.cid);

    console.log("formData");
    console.log(formData.get('files'))

    fetchFile(nodeBBURL + "/api/post/upload",dataRes.token,formData)
      .then(function(res){
        console.log('res',res);
      }).catch(function (error){
        console.log('error',error);
      });  
  });        

}

export function uploadContentCheck(){

}