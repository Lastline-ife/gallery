AV.initialize("tu2kbxu5x8bkd4i6n8sx3qmxde21mkz27fh958fdmn1koxp8", "th3uzwbjsh04s40elncun1asvry4wzurhna95vjx0rid442m");
// var TestObject = AV.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}, {
//   success: function(object) {
//   alert("LeanCloud works!");
//   }
// });
$(function() {
    $('#upload').click(function() {
        var fileUploadControl = $("#photoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            baseService.savePicture(file, 'category2', 'name1');
        }
    })
});

(function() {
    var Picture = AV.Object.extend("Picture");
    var _File = AV.Object.extend("_File");

    function getPictureByCategory(category,callback) {
        var query = new AV.Query(_File);
        query.startsWith("name", category+'{}');
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

    function savePicture(file, category, name) {
        var avFile = new AV.File(category+'{}'+name+'.jpg', file);
        avFile.save()
            .then(function() {
                alert('The file has been saved to AV.');
            }, function(error) {
                alert('The file either could not be read, or could not be saved to AV.');
            });
    }




    window.baseService = {
        getPictureByCategory: getPictureByCategory,
        savePicture: savePicture
    }



})()
