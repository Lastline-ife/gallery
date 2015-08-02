(function() {
    // 头部模版
    var tplHeader = '<li><a class="category-name">{{ category_name }}</a></li>';
    var preRenderHeader = new baseService.Template(tplHeader);
    var renderHeader = function(categoryArray) {
        var HTMLstr = '<li><a class="category-name">全部</a></li>';
        for (var i = 0; i < categoryArray.length; i++) {
            var model = {
                category_name : categoryArray[i]
            };
            HTMLstr += preRenderHeader.render(model);
        }
        $('.header-ul').html(HTMLstr);
    };

    // 主体模版
    var tplBody = '<div class="thumbnail" infocategory="{{category}}" infoname="{{name}}">' +
        '<img class="thumbnail-image" src="{{url}}" alt=""/></div>';
    var preRenderBody = new baseService.Template(tplBody);
    var renderBody = function(pictureArray) {
        for(var i = 0; i < pictureArray.length ; i++){
            var nowHTML = $('.column' + i%4).html();
            var model = {
                category : pictureArray[i].category,
                name : pictureArray[i].name,
                url : pictureArray[i].thumbnailURL
            };
            var divHTML = preRenderBody.render(model);
            $('.column' + i%4).html(nowHTML+divHTML);
        }
    };

    window.render = {
        renderHeader : renderHeader,
        renderBody : renderBody
    }
})();