// var imageMagick = require('imagemagick');
var jimp = require('jimp');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.beforeSave("Post", function(request, response) {
    
    var imgUrl = request.object.get("imageFile").url();
    // console.log("\n"+imgUrl.split('.')[0]+"_50.png"+ "\n "+ imgUrl.split('myAppId')[0]+"myAppId/ "+"\n");
    jimp.read(imgUrl).then(function (img) {

      let newImg = img.resize(img.bitmap.width/2, jimp.AUTO);
      console.log(newImg);     // resize
      var parseFile = new Parse.File("image_50.png", newImg.buffer);
      parseFile.save().then(function() {
        // The file has been saved to Parse.
        console.log("saved");
      }, function(error) {
        // The file either could not be read, or could not be saved to Parse.
      });
    }).then((res)=>{
      console.log("\n");
      console.log(res);
      response.success();
    }).catch(function (err) {
      console.error(err);
    });  
    
 
  },function(error) {
      response.error("HEYyyyyyyy "+error);
});