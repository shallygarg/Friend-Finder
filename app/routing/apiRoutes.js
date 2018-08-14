// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on friends data
// ===============================================================================

var friendsData 	= require('../data/friends.js');
var path 			= require('path');



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });
    // Create New Friends - takes in JSON input
    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var newFriend = req.body;
        var matchingFriend = [];
        var difference = 60;
        for(var i = 0; i<friendsData.length; i++){
            var total = 0;


            for (var j = 0; j<newFriend.scores.length; j++){
                total = total + Math.abs(newFriend.scores[j] - friendsData[i].scores[j]);
            }
            console.log(total);
            if(total < difference){
                difference = total;
                matchingFriend = friendsData[i];
            }
        }
        console.log(matchingFriend);

        friendsData.push(newFriend);
        
        res.json(matchingFriend);
    });
}