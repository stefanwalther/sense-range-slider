# Range Slider

Very early prototype of a Range Slider to manipulate two variables in Qlik Sense.


> ![](docs/img/RangeSlider_Basic.png)

## Properties:

**Step** - Amount to change the value by when moving a handle (Default: 1)  
**Lower Value** - The minimum value the user can select (Default: 0)  
**Upper Value** - The maximum value the user can select (Default: 100)  
**Variable for Lower Value** - The variable the lower selected value should be saved to.  
**Variable for Upper Value** - The variable the upper selected value should be saved to.  

## Creating variables in Qlik Sense:
Create your variables in the Data Load Script, eg.

	SET vMin = 0;
	SET vMax = 100;

Then the variables can be used in the Range Slider.

## Latest Version
Version 0.1.0 based on Qlik Sense 1.0

## Known Issues
* This a very, very basic prototype, a lot of features are missing
	* Validation
	* Manipulating not only a range of values but also a single value
	* Showing the scale and current value

## Author
Stefan Walther, 2014

## License & Copyright
See License.md

