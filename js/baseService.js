AV.initialize("noew3oh7gutlboqz4vh7cpbh26zjxchsdrjd75kzl8pv26t0", "t5h3fn0qcdfxssnxjnn5enigdu4ii07gm223jlltjv0z3411");

(function() {
    var Picture = AV.Object.extend("Picture");
    var _File = AV.Object.extend("_File");
    var allCategoryName = AV.Object.extend("allCategoryName");

    /**
     * 获取图片的URL，数组形式返回给回调函数
     * @param {string} category
     * @param {function} callback
     */
    function getPicturesByCategory(category, callback) {
        var query = new AV.Query(_File);
        query.startsWith("name", category + '{}');
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " posts.");
                // 处理返回的结果数据
                var urlArray = [];
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // alert(object.id + ' - ' + object.get('content'));
                    urlArray.push(object.get('url'));
                }
                callback(urlArray);
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
                nowCategory.data.push(newCategoryName)
                var newCategory = JSON.stringify(nowCategory);
                results[0].set('allCategoryName', newCategory);
                results[0].save();
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    window.baseService = {
        getPicturesByCategory: getPicturesByCategory,
        savePicture: savePicture,
        addCategory: addCategory,
        getAllCategoryName: getAllCategoryName,
        refreshCategory: refreshCategory
    }



})();
