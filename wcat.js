const fs=require('fs');
let inputArr=process.argv.slice(2);
 console.log(inputArr);
let filesArr=[];
//placed files path in filesArr
for(let i=0;i<inputArr.length;i++){
    filesArr.push(inputArr[i]);
}
// console.log("file to be read are"+ filesArr);
//check if all the files are present
for(let i=0;i<filesArr.length;i++){
    let doesExist=fs.existsSync(filesArr[i]);
        if(!doesExist){
            console.log("Files does not exist");
                 process.exit();
               }
}
//content read and appending starts
let content="";
for (let i = 0; i < filesArr.length; i++) {
    let fileContent=fs.readFileSync(filesArr[i]);
    content+=fileContent+"\n";
}
console.log(content);