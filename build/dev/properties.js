/*global define*/
'use strict';
define( [], function () {

	var enabledDisabled = {
		ref: "props.enabled",
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
		ref: "props.rangeMin",
		label: "Lower Value",
		type: "number",
		expression: "optional",
		defaultValue: 0,
		show: true
	};

	var rangeMax = {
		ref: "props.rangeMax",
		label: "Upper Value",
		type: "number",
		expression: "optional",
		defaultValue: 100,
		show: true
	};

	var sliderStep = {
		ref: "props.step",
		label: "Step",
		type: "number",
		expression: "optional",
		defaultValue: 1,
		show: true
	};

	var varMin = {
		ref: "props.varMin",
		label: "Variable for Lower Value",
		type: "string"
	};

	var varMax = {
		ref: "props.varMax",
		label: "Variable for Upper Value",
		type: "string"
	};

	var orientation = {

		ref: "props.orientation",
		type: "string",
		label: "Orientation"

	};

	// ****************************************************************************************
	// Settings Accordion
	// ****************************************************************************************

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
			settings: settings

		}
	};

} );