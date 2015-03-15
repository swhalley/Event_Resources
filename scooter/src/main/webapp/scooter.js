dojo.provide("scooter.src");

dojo.require("dojox.css3.fx");

// inspired by https://github.com/dojo/demos/tree/master/css3
// and uses Dojo - http://dojotoolkit.org/

dojo.declare("Scooter", null, {
    menuNode: null,
    // increment: 360,
    angle: 0,
    constructor: function(){
        // ------------------- data
        var attendeeList = new AttendeeList(ATTENDEE_LIST);

        var numNames = attendeeList.getNumNames();
        
        // ------------------- reset button
        var resetButton = dojo.create("button",{ innerHTML: "Reset",id: "resetButton" }, dojo.body());
        
        dojo.connect(resetButton, "onclick", function(){
            dojo.query(".box").forEach(function(node){
                dojo.style(node, {transform: "scale(1)", opacity: "1"});
                attendeeList.reset();
            });
        });
        // ------------------- Draw button
        var drawButton = dojo.create("button",{ innerHTML: "Draw",id: "drawButton" }, dojo.body());
        
        dojo.connect(drawButton, "onclick", function(){
            var loserAnimations = ["puff","shrink"];
            var count = 0;
            
            // Each person has a 1-in-N chance of losing this round.
            // Note it is possible for no one to lose in a given round.
            
            dojo.query(".box").forEach(function(node){
                var name = node.id;
                var isLoser = attendeeList.isLoserThisRound(name);
                
                if (isLoser) {
                    animation = loserAnimations[count % 2]; 
                    dojox.css3.fx[animation]({node: node}).play();                    
                }
                count++;
            });
            
            if (attendeeList.doesWinnerExist()) {
                dojo.query(".box").forEach(function(node){
                    var name = node.id;
                    var isWinner = attendeeList.isWinner(name);

                    if (isWinner) {
                        dojox.css3.fx["rotate"]({node: node}).play();                                        
                    }
                });                
            }
        });
        
        // ------------------- boxes
        
        // this.increment = 360 / numNames;
        this.menuNode = dojo.create("div", {className: "menu"}, dojo.body());
        
        var numBoxesPerRow = 7;
        
        for(var i = 0; i < numNames; i++) {
            var name = attendeeList.getName(i);
            var box = dojo.create("div", {
                innerHTML: "<span>" + name + "</span>",
                className: "box",
                id: name,
                style: {
                    left: (i % numBoxesPerRow) * 200 + "px",
                    top: Math.floor(i / numBoxesPerRow)*100 + "px"
                }
            }, this.menuNode);
        }
    }
});

dojo.ready( function() { new Scooter(); } );
