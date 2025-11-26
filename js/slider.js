/*
File:           slider.js
Class:          COMP 4610 GUI Programming I
Assignment:     HW4 Part 2, "jQuery UI Slider and Tab Widgets"
Name:           Nathan Khoury
Created:        11/26/2025
Last Modified:  11/26/2025

This file implements the jQuery UI Sliders for each of the four input fields. Two-way
binding is enforced between the sliders and their corresponding input fields. This file 
is also responsible for setting fields values to 0 on page load to match the slider defaults.
*/

$(document).ready(function()  {
    // define slider constants
    const MIN = -50;
    const MAX = 50;
    const STEP = 1;
    const ANIM = true;

    // set initial input fields to match slider defaults (0)
    $("#colMin").val(0);
    $("#colMax").val(0);
    $("#rowMin").val(0);
    $("#rowMax").val(0);

    // initialize sliders
    $("#colMinSlider").slider({
        min: MIN,
        max: MAX,
        step: STEP,
        animate: ANIM,
        slide: function(event, ui) {
            // update corresponding input field when slider is moved
            $("#colMin").val(ui.value);
            // if valid then generate table
            if ($("#colMin").valid() && $("#colMax").valid()) {
                $("#form").submit();
            }
        }        
    });
    $("#colMaxSlider").slider({
        min: MIN,
        max: MAX,
        step: STEP,
        animate: ANIM,
        slide: function(event, ui) {
            // update corresponding input field when slider is moved
            $("#colMax").val(ui.value);
            // if valid then generate table
            if ($("#colMin").valid() && $("#colMax").valid()) {
                $("#form").submit();
            }
        }        
    });
    $("#rowMinSlider").slider({
        min: MIN,
        max: MAX,
        step: STEP,
        animate: ANIM,
        slide: function(event, ui) {
            // update corresponding input field when slider is moved
            $("#rowMin").val(ui.value);
            // if valid then generate table
            if ($("#rowMin").valid() && $("#rowMax").valid()) {
                $("#form").submit();
            }
        }        
    });
    $("#rowMaxSlider").slider({
        min: MIN,
        max: MAX,
        step: STEP,
        animate: ANIM,
        slide: function(event, ui) {
            // update corresponding input field when slider is moved
            $("#rowMax").val(ui.value);
            // if valid then generate table
            if ($("#rowMin").valid() && $("#rowMax").valid()) {
                $("#form").submit();
            }
        }        
    });

    // update sliders when input fields are changed manually
    $("#colMin").on("input", function(e) {
        $("#colMinSlider").slider("value", Number(e.target.value));
    });
    $("#colMax").on("input", function(e) {
        $("#colMaxSlider").slider("value", Number(e.target.value));
    });
    $("#rowMin").on("input", function(e) {
        $("#rowMinSlider").slider("value", Number(e.target.value));
    });
    $("#rowMax").on("input", function(e) {
        $("#rowMaxSlider").slider("value", Number(e.target.value));
    });

});