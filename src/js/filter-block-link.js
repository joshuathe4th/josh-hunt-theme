/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
//import classnames from 'classnames';
//import NumberControl from 'components';

const { assign, merge } = lodash;

const { __ } = wp.i18n;
const { addFilter, useState } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, InspectorAdvancedControls } = wp.blockEditor;
const { PanelBody, TextControl,	SelectControl, RangeControl } = wp.components;

var disallowedBlocks = [

];

/**
 * Add Speed attribute
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 */
function huntsman_addBlockLink(settings, name) {
	if (!disallowedBlocks.includes(name)) {
		return assign({}, settings, {
			attributes: merge(settings.attributes, {
				linkValue: {
					type: 'string',
					default: '',
				}
				
			}),
		});
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType', // Hook Name
	'intro-to-filters/button-block/add-attributes', // namespace plugin/component-name/what-filter-does
	huntsman_addBlockLink, // function that does the filtering from above
);

/**
 * Add Animations Control
 */
const addInspectorControl = createHigherOrderComponent((BlockEdit) => {

	return (props) => {
		const {
			attributes: { linkValue },
			setAttributes,
			name,
		} = props;
	
		



		function handleChange(event) {
			console.log(event);
		  }

		

		if (disallowedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}
		
		return (
		<Fragment>
			<BlockEdit {...props} />
			<InspectorAdvancedControls>
			
						<TextControl
							label='Link'
							type='string'
							placeholder='https://www.link.com'
							value={ linkValue }
							onChange={(value) => {
								setAttributes({ linkValue: value });
				
							}}
						/>

					
				</InspectorAdvancedControls>
		</Fragment>

		
		);
	};
}, 'withAdvancedInspectorControl');

addFilter(
	'editor.BlockEdit',
	'intro-to-filters/button-block/add-inspector-controls',
	addInspectorControl,
);









