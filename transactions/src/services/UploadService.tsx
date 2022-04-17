

function upload(file:any):void  {
const data = new FormData();
data.append("file",file);
fetch('/api/data', {
    method: "POST",
    body: data
}).then(async res =>{
    alert()
});
}

export default upload;
