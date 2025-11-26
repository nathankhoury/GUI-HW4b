$(document).ready(function() {
    // tab count, used to give unique ids to new tabs, not reflective of
    // actual number of tabs if any have been removed
    let tabCount = $("#tabs ul li").length; 
    // initialize tabs
    $("#tabs").tabs();

    // set onclick handler for tab insertion
    $("#addTab").click(function() {
        tabCount++;
        const tabNum = tabCount;   // what number tab is being added
        const tabTitle = "Tab " + tabNum;       // title of new tab
        const tabId = "tab-" + tabNum;          // id of new tab
        const tabContent = "<p>Content for " + tabTitle + " goes here.</p>"; // content of new tab
        
        // add the new tab
        $("#tabs ul").append("<li><a href='#" + tabId + "'>" + tabTitle + "</a></li>");
        // add the new content container
        $("#tabs").append("<div id='" + tabId + "'>" + tabContent + "</div>");
        // refresh to recognize new tab https://api.jqueryui.com/tabs/#method-refresh
        $("#tabs").tabs("refresh");
    });

    // set onclick handler for tab deletion
    $("#removeTab").click(function() {
        // https://stackoverflow.com/questions/1864219/need-currently-selected-tab-id-for-jquery-tabs
        const id = $("#tabs .ui-tabs-panel:visible").attr("id");
        // remove tab content
        $('#' + id).remove();
        // remove tab header
        $("#tabs ul li a[href='#" + id + "']").parent().remove();
        // refresh to recognize removed tab
        $("#tabs").tabs("refresh");
    });
});