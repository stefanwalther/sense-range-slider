/*global define*/
define([], function () {



    enabledDisabled = {
        ref: "settings.enabled",
        type: "boolean",
        component: "switch",
        label: "Enable Slider",
        options: [
            {
                value: true,
                label: "Enabled"
            },
            {
                value: false,
                label: "Disabled"
            }
        ],
        defaultValue: true
    };

    var rangeMin = {
        ref: "settings.rangeMin",
        label: "Lower Value:",
        type: "number",
        expression: "optional",
        defaultValue: 0,
        show: true
    };

    var rangeMax = {
        ref: "settings.rangeMax",
        label: "Upper Value:",
        type: "number",
        expression: "optional",
        defaultValue: 100,
        show: true
    };

    var sliderStep = {
        ref: "settings.sliderStep",
        label: "Step:",
        type: "number",
        expression: "optional",
        defaultValue: 1,
        show: true
    };

    varMin =  {
        ref: "settings.varMin",
        label: "Variable for Lower Value",
        type: "string"
    };

    varMax =  {
        ref: "settings.varMax",
        label: "Variable for Upper Value",
        type: "string"
    };


    var settings = {
        uses: "settings",
        items: {
            rangeSettings: {
                type: "items",
                label: "Slider: Range",
                items: {

                    sliderStep: sliderStep,

                    rangeMin: rangeMin,
                    rangeMax: rangeMax,

                    varMin: varMin,
                    varMax: varMax
                }
            }
        }
    };


    // Return values
    return {
        type: "items",
        component: "accordion",
        items: {
            //dimensions: dimensions,
            //measures: measures,
            //sorting: sorting,
            //addons: addons,
            settings: settings

        }
    };

});