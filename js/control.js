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


    function showDiv() {
        console.log('aaaaaaaa');
        var doc = document,
            sWidth = doc.body.scrollWidth,
            sHeight = doc.body.scrollHeight;
        var oMask = doc.getElementById('popWindow');
        doc.getElementById('maskLayer').style.display = 'block';
        oMask.style.height = sHeight + "px";
        oMask.style.width = sWidth + "px";
    }

    function closeDiv() {
        var doc = document;
        doc.getElementById('maskLayer').style.display = 'none';
    }

    //事件代理
    $(window).click(function(e) {
        var target = $(e.target);
        console.log(target);
        if (target.attr('class') == 'category-name') {
            console.log(target.html());
            if (target.html() == '全部') {
                $('.thumbnail').show();
            } else {
                $('.thumbnail').show();
                $('.thumbnail[infocategory!=' + target.html() + ']').hide();
            }
        }



        if (target.attr('class') == 'thumbnail-image') {
            var imgURL = target.attr('src').split('?')[0];
            $('#pop > img').attr('src', imgURL);
            showDiv();
        }


        if(target.attr('class') == 'close-layer' || target.parent().attr('class') == 'close-layer'){
            console.log('wjfklajflwa');
            closeDiv();
        }
    })

    init();

})
