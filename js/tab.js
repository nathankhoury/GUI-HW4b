/*
File:           tab.js
Class:          COMP 4610 GUI Programming I
Assignment:     HW4 Part 2, "jQuery UI Slider and Tab Widgets"
Name:           Nathan Khoury
Created:        11/26/2025
Last Modified:  11/26/2025

Logic pertaining to the jQuery UI Tabs widt=get is implemented here. The user can
save the currently generated multiplication table as a new tab by clicking the
"Add Tab" button. Each tab is given a unique id and title. The user can also remove 
tabs either individually (which would be the currently visible tab) or in bulk
(by using checkboxes in the "Saved Tables" section).
*/

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
        const tabTitle = "Table " + tabNum;       // title of new tab
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
        tableWrapper.append($("<div>"))
            .addClass("savedTable")
            .append(tableClone);
        $("#tabs").append(tableWrapper);
        // refresh to recognize new tab https://api.jqueryui.com/tabs/#method-refresh
        $("#tabs").tabs("refresh");

        // add tab to tabChecklist
        const listItem = $("<li>");             // create new list item
        const checkbox = $("<input>")           // create checkbox content
            .attr("type", "checkbox")
            .attr("id", "check-" + tabId)
            .prop("checked", false);
        const label = $("<label>")              // provide label
            .attr("for", "check-" + tabId)
            .text(tabTitle);
        listItem.append(checkbox).append(label);    // append to li
        $("#tabChecklist").append(listItem);        // append li to ul
    });

    // set onclick handler for tab deletion
    $("#removeTab").click(remove);
});

function remove() {
    console.log("remove() called");
    // determine if removing one or multiple tabs
    const checkedBoxes = $("#tabChecklist input:checked");
    if (checkedBoxes.length > 0) {
        // remove all checked tabs
        removeMany(checkedBoxes);
    } else {
        // remove currently visible tab
        removeOne();
    }
}

function removeMany(checkedBoxes) {
    checkedBoxes.each(function() {
        const id = $(this).attr("id").substring(6); // get tab id by removing "check-" prefix
        console.log("removing tab with id: " + id);
        // remove tab content
        $('#' + id).remove();
        // remove tab header
        $("#tabs ul li a[href='#" + id + "']").parent().remove();
        // remove tab from tabChecklist
        $(this).parent().remove();
    });
}

function removeOne() {
        // https://stackoverflow.com/questions/1864219/need-currently-selected-tab-id-for-jquery-tabs
        const id = $("#tabs .ui-tabs-panel:visible").attr("id");
        console.log("removing tab with id: " + id);
        // remove tab content
        $('#' + id).remove();
        // remove tab header
        $("#tabs ul li a[href='#" + id + "']").parent().remove();
        // refresh to recognize removed tab
        $("#tabs").tabs("refresh");

        // remove tab from tabChecklist
        $("#check-" + id).parent().remove();
}