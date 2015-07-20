AV.initialize("5x7fvqzacxlv89hc9cwtec9cs9rqwyx7fphkyi1lfsm8oseh", "xyk5oksdlkz4zfm2h0hyjutzem7xgo0k4wpok6pgsipjdiwc");
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

    function getPicturesByCategory(category,callback) {
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
                alert('The file either could not be read, or could not be saved to AV.'+ error);
            });
    }




    window.baseService = {
        getPicturesByCategory: getPicturesByCategory,
        savePicture: savePicture
    }



})();
