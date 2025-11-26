/*
File:           validate.js
Class:          COMP 4610 GUI Programming I
Assignment:     HW4 Part 1, "Validation Plugin"
Name:           Nathan Khoury
Created:        11/22/2025
Last Modified:  11/24/2025

This file implements form validation using the jQuery Validation plugin. 
All form fields are validated to ensure proper content. This is forced via
the "submitHandler" function, which only calls the main table generation
driver function if validation succeeds. Custom validation methods are also
defined to enforce relational constraints between min/max fields.
*/

$(document).ready(function() {
    // file loaded
    console.log("validate.js: document ready");

    // Less Than or Equal To method
    $.validator.addMethod("lteq", function(value, element, param) {
        return Number(value) <= Number($(param).val());
    });

    // Greater Than or Equal To method
    $.validator.addMethod("gteq", function(value, element, param) {
        return Number(value) >= Number($(param).val());
    });

    // Verify integer input (not float)
    $.validator.addMethod("integer", function(value, element) {
        return Number.isInteger(Number(value));
    });

    // set up validation rules and messages
    $('#form').validate({
        // handles valid form submission
        submitHandler: function(form) { 
            // validation succeeded
            console.log("Validation succeeded");
            // call function to generate table
            generate();
        },
        // handles invalid form submission
        invalidHandler: function(event, validator) {
            // validation failed
            console.log("Validation failed. Number of errors: " + validator.numberOfInvalids());
        },
        // format error messages inline with red text
        errorClass: "error",    
        rules: {
            colMin: {
                required: true,     // must be filled out by user
                number: true,       // must be a valid number
                range: [-50, 50],   // must be gteq -50 and lteq 50
                lteq: "#colMax",    // must be lteq value in colMax
                integer: true       // must be an integer
            },
            colMax: {
                required: true,
                number: true,
                range: [-50, 50],
                gteq: "#colMin",
                integer: true
            },
            rowMin: {
                required: true,
                number: true,
                range: [-50, 50],
                lteq: "#rowMax",
                integer: true
            },
            rowMax: {
                required: true,
                number: true,
                range: [-50, 50],
                gteq: "#rowMin",
                integer: true
            }
        },
        // Custom error messages to inform user with appropriate detail
        messages: {
            colMin: {
                required: "Please provide a minimum column value",
                number: "Please enter a valid number",
                range: "Minimum column value must be between -50 and 50",
                lteq: "Minimum column value must be less than or equal to maximum column value",
                integer: "Minimum column value must be an integer"
            },
            colMax: {
                required: "Please provide a maximum column value",
                number: "Please enter a valid number",
                range: "Maximum column value must be between -50 and 50",
                gteq: "Maximum column value must be greater than or equal to minimum column value",
                integer: "Maximum column value must be an integer"
            },
            rowMin: {
                required: "Please provide a minimum row value",
                number: "Please enter a valid number",
                range: "Minimum row value must be between -50 and 50",
                lteq: "Minimum row value must be less than or equal to maximum row value",
                integer: "Minimum row value must be an integer"
            },
            rowMax: {
                required: "Please provide a maximum row value",
                number: "Please enter a valid number",
                range: "Maximum row value must be between -50 and 50",
                gteq: "Maximum row value must be greater than or equal to minimum row value",
                integer: "Maximum row value must be an integer"
            }
        }
    });

    // Address hanging error messages when related fields are changed
    $('#colMax').on('input', function() { $('#colMin').valid(); });
    $('#colMin').on('input', function() { $('#colMax').valid(); });
    $('#rowMax').on('input', function() { $('#rowMin').valid(); });
    $('#rowMin').on('input', function() { $('#rowMax').valid(); });
});
