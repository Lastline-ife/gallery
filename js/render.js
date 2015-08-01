(function() {

    var template = {
        header: '<li><a class="category-name">{{category-name}}</a></li>',
        picture: '<div class="thumbnail" infocategory="{{category}}" infoname="{{name}}"><img class="thumbnail-image" src="{{url}}" alt=""/></div>',
    }

    function renderHeader(categoryArray) {
        var HTMLstr = '<li><a class="category-name">全部</a></li>';
        for (var i = 0; i < categoryArray.length; i++) {
            HTMLstr = HTMLstr + template.header.replace(/{{category-name}}/g,categoryArray[i]); 
        }
        $('.header-ul').html(HTMLstr);
    }

    function renderBody(pictureArray){
        for(var i = 0; i < pictureArray.length ; i++){
            var nowHTML = $('.column' + i%4).html();
            var divHTML = template.picture.replace(/{{url}}/g,pictureArray[i].thumbnailURL).replace(/{{category}}/g,pictureArray[i].category).replace(/{{name}}/g,pictureArray[i].name);
            $('.column' + i%4).html(nowHTML+divHTML);
        }
    }

    window.render = {
      renderHeader : renderHeader,
      renderBody : renderBody
    }
})()
