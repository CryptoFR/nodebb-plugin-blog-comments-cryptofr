import { dataRes, set, gifCommentBox } from "../../settings.js";
import { fetchFile } from "../api.js";

/******* UPLOAD FILES *******/

export function uploadInit(){
  $(document).on('click','.special-action.img', function(){
    $("#formupload #file").trigger("click");
    set.gifCommentBox(this.closest('form').querySelector("textarea"))
  });
	$("#formupload #file").on("change", function (e) {
    e.preventDefault();
    var formData = new FormData(document.querySelector("#formupload"));
    formData.append('files[0]', $(this)[0].files[0]);
    formData.append('cid', dataRes.category.cid);
    formData.append('_csrf', dataRes.token)

    // console.log("formData");
    // console.log(formData.get('files'))

    let wysiwig=gifCommentBox.closest('form').querySelector('.emoji-wysiwyg-editor')
    wysiwig.innerText+=" (-Loading File-)";
    gifCommentBox.value+=" (-Loading File-)";
    fetchFile(nodeBBURL + "/api/post/upload",dataRes.token,formData)
      .then(res => res.json())
      .then(function(res){
        console.log('res',res);

        let fileName= res[0].url.split('/')[res[0].url.split('/').length-1];

        let imagePath= "!["+fileName+"]("+nodeBBURL+res[0].url+")";

        wysiwig.innerText=wysiwig.innerText.replace('(-Loading File-)',imagePath)
        gifCommentBox.value=gifCommentBox.value.replace('(-Loading File-)',imagePath)

        console.log('gifCommentBox',gifCommentBox)
        console.log('wysiwig',wysiwig)


      }).catch(function (error){
        console.log('error',error);
      });  
  });        

}
 