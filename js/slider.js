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
            $("#colMin").valid(); // trigger validation for self
            $("#colMax").valid(); // trigger validation for dependent
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
            $("#colMax").valid(); // trigger validation for self
            $("#colMin").valid(); // trigger validation for dependent
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
            $("#rowMin").valid(); // trigger validation for self
            $("#rowMax").valid(); // trigger validation for dependent
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
            $("#rowMax").valid(); // trigger validation for self
            $("#rowMin").valid(); // trigger validation for dependent
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