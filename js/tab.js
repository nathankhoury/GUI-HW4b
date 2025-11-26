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
        // clone the generated table
        const tableClone = $("#result").clone();
        // remove id from clone
        tableClone.removeAttr("id");

        // add the new tab header
        $("#tabs ul").append("<li><a href='#" + tabId + "'>" + tabTitle + "</a></li>");
        // create a new div wrapper by using "<div>" rather than "div"
        // give the new wrapper the tabId as its id
        const tableWrapper = $("<div>").attr("id", tabId);
        // append the cloned table to the new wrapper
        tableWrapper.append($("<div>"));
        tableWrapper.addClass("savedTable");
        tableWrapper.append(tableClone);
        $("#tabs").append(tableWrapper);
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