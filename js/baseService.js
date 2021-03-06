AV.initialize("noew3oh7gutlboqz4vh7cpbh26zjxchsdrjd75kzl8pv26t0", "t5h3fn0qcdfxssnxjnn5enigdu4ii07gm223jlltjv0z3411");

(function() {
    var Pictures = AV.Object.extend("Pictures");
    var _File = AV.Object.extend("_File");
    var allCategoryName = AV.Object.extend("allCategoryName");

    /**
     * 获取图片的URL，数组形式返回给回调函数
     * @param {string} category
     * @param {function} callback
     */
    function getPicturesByCategory(category, callback) {
        var query = new AV.Query(Pictures);
        query.startsWith("info", category + '{}');
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " posts.");
                // 处理返回的结果数据
                var pictureArray = [];
                for (var i = 0; i < results.length; i++) {
                    var AVObject = results[i];
                    // alert(object.id + ' - ' + object.get('content'));
                    var picture = {
                        URL : AVObject.get('image').url(),
                        thumbnailURL : AVObject.get('image').thumbnailURL(200, 200),
                        category : AVObject.get('info').split('{}')[0],
                        name : AVObject.get('info').split('{}')[1]
                    };
                    urlArray.push(picture);
                }
                callback(pictureArray);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    function getAllPictures(callback) {
        var query = new AV.Query(Pictures);
        query.exists("info");
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " posts.");
                // 处理返回的结果数据
                var pictureArray = [];
                for (var i = 0; i < results.length; i++) {
                    var AVObject = results[i];
                    // alert(object.id + ' - ' + object.get('content'));
                    var picture = {
                        URL : AVObject.get('image').url(),
                        thumbnailURL : AVObject.get('image').thumbnailURL(200, 200),
                        category : AVObject.get('info').split('{}')[0],
                        name : AVObject.get('info').split('{}')[1]
                    };
                    pictureArray.push(picture);
                }
                callback(pictureArray);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    /**
     * 把图片上传服务器
     * @param {HTMLInputElement} file
     * @param {string} category
     * @param {string} name
     */
    function savePicture(file, category, name) {
        var avFile = new AV.File(category + '{}' + name + '.jpg', file);
        avFile.save()
            .then(function() {
                alert('The file has been saved to AV.');
            }, function(error) {
                alert('The file either could not be read, or could not be saved to AV.' + error);
            });

        var post = new AV.Object("Pictures");
        post.set("info", category + '{}' + name + '.jpg');
        post.set("image", avFile);
        post.save();
        refreshCategory(category);
    }


    /**
     * 传入一个类别的名称，检查这个类别是否存在，若不存在的话添加这个类别
     * @param {string} categoryName
     */
    function refreshCategory(categoryName) {
        //设置类别，如果是新类别的话就添加
        getAllCategoryName(function(result) {
            if (result.indexOf(categoryName) == -1) {
                addCategory(categoryName);
            }
        })
    }
    /**
     * 获取全部专辑名字
     * @param {function} callback
     */
    function getAllCategoryName(callback) {
        var query = new AV.Query(allCategoryName);
        query.equalTo("name", "allCategoryName");
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " posts.");
                // 处理返回的结果数据
                var result = JSON.parse(results[0].get('allCategoryName')).data;
                callback(result);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }


    function addCategory(newCategoryName) {
        var query = new AV.Query(allCategoryName);
        query.equalTo("name", "allCategoryName");
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " posts.");
                // 处理返回的结果数据
                var nowCategory = JSON.parse(results[0].get('allCategoryName'));
                nowCategory.data.push(newCategoryName);
                var newCategory = JSON.stringify(nowCategory);
                results[0].set('allCategoryName', newCategory);
                results[0].save();
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }


    /**
     * 简单的模版引擎
     *
     * tpl = Template('<p>Today: {{ date }}</p>\n<a href="/{{ user.id }}">{{ user.company }}</a>');
     * var model = {
     *   date: 20150316,
     *   user: {
     *       id: '001',
     *       company: 'AT&T'
     *   }
     * };
     * s = tpl.render(model);
     * $(#id).html = s;
     *
     * @param {string} tpl - 模版字符串
     * @constructor
     */
    function Template(tpl) {
        var
            fn,
            match,
            code = ['var r=[];'],
            re = /\{\{\s*([a-zA-Z\.\_0-9()]+)\s*\}\}/m,
            addLine = function (text) {
                code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
            };
        while (match = re.exec(tpl)) {
            if (match.index > 0) {
                addLine(tpl.slice(0, match.index));
            }
            code.push('r.push(this.' + match[1] + ');');
            tpl = tpl.substring(match.index + match[0].length);
        }
        addLine(tpl);
        code.push('return r.join(\'\');');
        console.log(code.join('\n'));
        // 创建函数:
        fn = new Function(code.join('\n'));
        // 用render()调用函数并绑定this参数：
        this.render = function (model) {
            return fn.apply(model);
        };
    }

    window.baseService = {
        getPicturesByCategory: getPicturesByCategory,
        getAllPictures: getAllPictures,
        savePicture: savePicture,
        addCategory: addCategory,
        getAllCategoryName: getAllCategoryName,
        refreshCategory: refreshCategory,
        Template: Template
    }



})();
