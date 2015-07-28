$(function() {

    //初始化
    function init() {
        baseService.getAllCategoryName(function(categoryArray) {
            render.renderHeader(categoryArray);
        })

        baseService.getAllPictures(function(picturesArray) {
            console.log(picturesArray);
            render.renderBody(picturesArray);
        })
    }


    //事件代理
    $(window).click(function(e) {
        var target = $(e.target);
        if (target.attr('class') == 'category-name') {
            console.log(target.html());
            if (target.html() == '全部') {
                $('.thumbnail').show();
            } else {
                $('.thumbnail').show();
                $('.thumbnail[infocategory!=' + target.html() + ']').hide();
            }
        }
    })

    init();

})
