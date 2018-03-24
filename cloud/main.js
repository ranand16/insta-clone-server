var Jimp = require("jimp");

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.beforeSave("Post", function(request, response) {
  Parse.Cloud.httpRequest({
      url: request.object.get("imageFile").url()
  }).then(function(res) {
    console.log(res);
    Jimp.read(res.buffer).then(function (lenna) {
        var newImage = lenna

        var currentWidth = lenna.bitmap.width;
        var currentHeight = lenna.bitmap.height;

        // for 50% size
        var editedWidth_One = currentWidth * 0.5;
        var editedHeight_One = currentHeight * 0.5;
        newImage.resize(editedWidth_One, editedHeight_One);
        // console.log(newImage);
        newImage.getBuffer( newImage.getMIME(), function(req,result){
          // console.log(req);            
          // console.log("res : "+result.getBase64);
          
        var imageFile_50 = new Parse.File("imageFile_50",result, "image/png");
        imageFile_50.save({
          success: function(file){
            request.object.set("imageFile_50", file);
            request.object.save();
          },error: function(err){

          }
        });

        });
        
        

//         // ------------FOR FUTURE USE ---------

//         // for 75% size
//         // var editedWidth_Two = currentWidth * 0.75;
//         // var editedHeight_Two = currentHeight * 0.75;
                
//         // for 25% size
//         // var editedWidth_Three = currentWidth * 0.25;
//         // var editedHeight_Three = currentHeight * 0.25;

//         // ------------FOR FUTURE USE ---------

    }).catch(function (err) {
        console.error(err);
    });
    response.success();
  },function(error) {
      response.error("HEYyyyyyyy "+error);
  });

});