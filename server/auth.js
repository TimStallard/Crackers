var mongoose = require('mongoose');

module.exports = function(userName, userUUID) {
    if (userName && userUUID) {
       //Check for user
       mongoose.model('User').findOne({
           UUID: userUUID
       }, function(err, user){
           console.log('TEST User: ',user)
           if (user.length) {
               return user;
           } else {
               //If no user:
               var newUser = new User({
                   name: userName,
                   UUID: userUUID
               });

               mongoose.model('User').save(function(err, user2){
                   if (err){
                       return err;
                   } else {
                       return user2;
                   }
               });
           }
       });
   }

   return "Error: userName and/or userUUID is invalid";
}
