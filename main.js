$(document).ready(function () {
   /* concept found at
   * http://stackoverflow.com/questions/18396857/keep-jquery-slidedown-menu-open-when-hovering-over-that-menu
   * modified to fit application by James Abney
   */
	
	var navID, hoverID,
		timeout = 0,
		hovering = false;
	 
	// when user hovers over menu item it's corresponding text is displayed beneath
    $("li")
        .on("mouseover", function () {
        navID = $(this).attr("id"); // selects the specific li element id
		
		//sets hoverID to appropriate id based on the menu item hovered over
		if (navID == 'nav_about') {
			hoverID = "#hover_about";
		} else if (navID == 'nav_community') {
			hoverID = "#hover_community";
		} else if (navID == 'nav_care') {
			hoverID = "#hover_care";
		} else if (navID == 'nav_resources') {
			hoverID = "#hover_resources";
		} else if (navID == 'nav_visit') {
			hoverID = "#hover_visit";
		} 
		
		//ensures that only menu item's text is displayed at a time
		//array of possible ids
		var hoverIDArray = ["#hover_about","#hover_community","#hover_care","#hover_resources","#hover_visit"];
		var index = hoverIDArray.indexOf(hoverID);
		hoverIDArray.splice(index, 1); // removes id of currently hovered over element
		
		//loops through menu ids and turns all their displays to none if set to block
		for (var i=0; i<hoverIDArray.length; i++) {
			if ($(hoverIDArray[i]).css("display")== "block")
				$(hoverIDArray[i]).css("display","none");
		}
		
		hovering = true; // since element is hovered over, hovering is set to ture
        $(hoverID).show(); // hovered element's text is shown

        if (timeout > 0) {
            clearTimeout(timeout); // stops timer execution
        }
    })
        .on("mouseleave", function () {
        resetHover(); // calls resetHover function
    });

	// ensures menu text remains visible when user hovers over it
    $(".hidden")
		.on("mouseover", function () {
		hovering = true;
        startTimeout();
    })
        .on("mouseleave", function () {
        resetHover();
    });

	//function calls hideParagraph function after 2 seconds
    function startTimeout() {
        timeout = setTimeout(function () {
            hideParagraph();
        }, 2000);
    };

	//if hovering is set to false, the menu text is hidden
    function hideParagraph() {
        if (!hovering) {
			$(hoverID).hide();
        }
    };

	// sets hovering to false and calls timeout function
    function resetHover() {
        hovering = false;
        startTimeout();
    };
});
