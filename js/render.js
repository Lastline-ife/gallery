(function() {

    var template = {
        header: '<li><a href="" class="category-name">{{category-name}}</a></li>',
        picture: '<div class="thumbnail"><img src="{{picture-url}}" alt=""/></div>',
    }

    function renderHeader(categoryArray) {
        var HTMLstr = '';
        for (var i = 0; i < categoryArray.length; i++) {
            HTMLstr = HTMLstr + template.header.replace(/{{category-name}}/g,categoryArray[i]);
        }
        $('.header-ul').html(HTMLstr);
    }

    function renderBody(urlArray){

    }

    window.render = {
      renderHeader : renderHeader,
      renderBody : renderBody
    }
})()
