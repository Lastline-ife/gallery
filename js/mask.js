 function showDiv() {  
       var doc= document,
        sWidth=doc.body.scrollWidth,
	    sHeight=doc.body.scrollHeight;
       var   oMask= doc.getElementById('popWindow'); 
           oMask.style.display = 'block';  
           doc.getElementById('maskLayer').style.display = 'block';
           oMask.style.height= sHeight+"px";
           oMask.style.width= sWidth+"px";
    };  
 function closeDiv() { 
      var doc= document;
        doc.getElementById('popWindow').style.display = 'none';  
        doc.getElementById('maskLayer').style.display = 'none';  
    };  