const fs=require('fs');
let inputArr=process.argv.slice(2);
 console.log(inputArr);
let filesArr=[];
let optionsArr=[];
//placed files path in filesArr and optionsArr
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=='-'){
        optionsArr.push(inputArr[i]);
    }else{
    filesArr.push(inputArr[i]);
}
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
    content=content+fileContent+"\r\n";
}
console.log(content+" ");

//now our third command -s which will delete all extra lines from the file
let contentArr=content.split("\r\n")

//check if -s is present or not
let tempArr=[];
let isSPresent=optionsArr.includes("-s");
if(isSPresent){
  for(let i=1;i<contentArr.length;i++){
      if(contentArr[i]=="" && contentArr[i-1]==""){
          contentArr[i]=null;
      }
      else if(contentArr[i]=="" && contentArr[i-1]==null){
          contentArr[i]=null;
      }
  } 
  

  //pushing everything in tempArr except null
  for(let i=0;i<contentArr.length;i++){
      if(contentArr[i]!=null){
          tempArr.push(contentArr[i]);
      }
  }
  contentArr=tempArr;
}


let indexofN=optionsArr.indexOf("-n");
let indexofB=optionsArr.indexOf("-b");
//if both -n and -b are not present,-1 is returned

let finalOption="";
//if both -n and -b are present
if(indexofN!=-1 && indexofB!=-1){
if(indexofN<indexofB){
    finalOption="-n";
}
else{
    finalOption="-b";
}
}
//either -n is present or -b is present
else{
    if(indexofN!=-1){
        finalOption="-n";
    }
    else if(indexofB!=-1){
        finalOption="-b";
    }
}

//calling of functions by evaluating finalOption
if(finalOption=="-n"){
    modifyContentByN();
}
else if(finalOption=="-b"){
    modifyContentByB();
}

function modifyContentByN(){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1) +")"+contentArr[i];
    }
}

function modifyContentByB(){
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+")"+contentArr[i];
            count++;
        }
    }
}
 
console.log(contentArr);