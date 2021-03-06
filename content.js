$(document).dblclick(function(){
    dblclickSlection();
});

var selectedText;
function dblclickSlection(){
    flag = 0;
    if (window.getSelection) {
        selectedText = window.getSelection();
    } else if (document.getSelection) {
        selectedText = document.getSelection();
    } else if (document.selection) {
        selectedText = document.selection.createRange().text;
    }
    browser.runtime.sendMessage({"term": selectedText.toString()}).then(handleResponse, handleError);
}
function handleResponse(message){
    console.log("Response received ");
}
function handleError(error){
    console.log("Error: "+error);
}

browser.runtime.onMessage.addListener(function(msg){
    oRange = selectedText.getRangeAt(0);
    oRect = oRange.getBoundingClientRect();
    //console.log(oRect);
    //console.log(oRect.x+" "+oRect.y);
    if(document.getElementById("tooltipDictBox"))
        $("#tooltipDictBox").remove();
    if(msg.response != '{"readyState":4,"responseText":"","status":404,"statusText":"Not Found"}'){
        var div = document.createElement('p');  
        div.id = "tooltipDictBox";
        document.body.appendChild(div);
        var tooltipDictBox = document.getElementById("tooltipDictBox");
        div.innerHTML = div.innerText +"<br />"+msg.response;
        tooltipDictBox.style.boxShadow = "5px 5px 5px #888888";
        tooltipDictBox.style.position = 'absolute'; 
        tooltipDictBox.style.zIndex = "1000"; 
        tooltipDictBox.style.top = oRect.top-div.style.height+window.scrollY + 'px'; 
        tooltipDictBox.style.left = oRect.left+oRect.width+window.scrollX+1 + 'px';
        tooltipDictBox.style.backgroundColor = "#feffce";
        tooltipDictBox.style.padding = "10px";
        tooltipDictBox.style.fontFamily = "Arial";
        tooltipDictBox.style.fontSize = "13px";
        tooltipDictBox.style.borderRadius = "0px 5px 5px 5px";
        tooltipDictBox.style.maxWidth = "350px";
    }
});

$(document).click(function(event){
    //console.log("Mouse down");
    if(!document.getElementById("tooltipDictBox").contains(event.target)){
        $("#tooltipDictBox").remove();
    }else{
        //console.log("Clicked inside the definition tooltip");
        if(document.getElementById("closeBtnEPD").contains(event.target)){
            //console.log("Clicked on close button");
            $("#tooltipDictBox").remove();
        }
    }
});

