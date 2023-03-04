console.log("we are caling from ");


document.querySelector('#fileUpload').addEventListener('change', event => {
    handleImageUpload(event)
  });

function submitFile(event){
    console.log("this is) from the method");
    const files = event.target.files
  const formData = new FormData()
  formData.append('myFile', files[0])
    let postData = document.getElementById('uploadfile');
    console.log("this is file",postData.value);
    console.log("loc3");

    fetch('/uploadfile',{
        method : 'POST',
        body : postData.value,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'enctype' : "multipart/form-data"
        }
    }).then( (response) => {
        return response;
    }).then((res) => {
        console.log("fot the value");
        return res;
    }).catch((error)=>{
        return false;
    });
}