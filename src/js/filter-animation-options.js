/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
//import classnames from 'classnames';
//import NumberControl from 'components';

const { assign, merge } = lodash;

const { __ } = wp.i18n;
const { addFilter, useState } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl,	SelectControl, RangeControl } = wp.components;

var allowedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/image',
	'core/html',
	'core/button',
	'core/site-logo',
	'core/group',
	'core/post-title',
	'core/post-featured-image',
	'core/post-navigation-link',
	'core/post-template',
];

/**
 * Add Speed attribute
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 */
function huntsman_addAnimations(settings, name) {
	if (allowedBlocks.includes(name)) {
		return assign({}, settings, {
			attributes: merge(settings.attributes, {
				speed: {
					type: 'string',
					default: '',
				},
				entranceAnimation: {
					type: 'string',
					default: '',
				},
				entranceDelay: {
					type: 'number',
					default: '',
				},
				entranceStagger: {
					type: 'number',
					default: '',
				},
				entranceSpeed: {
					type: 'string',
					default: '',
				},
				
			}),
		});
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType', // Hook Name
	'intro-to-filters/button-block/add-attributes', // namespace plugin/component-name/what-filter-does
	huntsman_addAnimations, // function that does the filtering from above
);

/**
 * Add Animations Control
 */
const addInspectorControl = createHigherOrderComponent((BlockEdit) => {

	return (props) => {
		const {
			attributes: { speed, entranceAnimation, entranceSpeed, entranceDelay, entranceStagger, },
			setAttributes,
			name,
		} = props;
	
		



		function handleChange(event) {
			console.log(event);
		  }

		

		if (!allowedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}
		
		return (
		<Fragment>
			<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Animation', 'intro-to-filters')} initialOpen={false}>
						<TextControl
							label='Scroll Speed'
							type='number'
							placeholder='0.5'
							value={ speed }
							onChange={(value) => {
								setAttributes({ speed: value });
				
							}}
						/>

						<SelectControl
							label={__('Entrance Animation', 'intro-to-filters')}
							value={entranceAnimation}
							options={[
								{
								label: __('None', 'intro-to-filters'),
								value: 'no-animation',
								}, 
								{
								label: __('Move Up Letters', 'intro-to-filters'),
								value: 'move-down-letters'
								}
							]}
							onChange={(value) => {
								setAttributes({ entranceAnimation: value });
							}}
							/>	

						<TextControl
							label={ __('Entrance Duration (seconds)', 'intro-to-filters') }
							type='number'
							placeholder='0.5'
							value={entranceSpeed}
							onChange={(value) => {
								setAttributes({ entranceSpeed: value });
							}}
						/>

					    <TextControl
							label={ __('Entrance Delay (seconds)', 'intro-to-filters') }
							type='number'
							placeholder='0.5'
							value={entranceDelay}
							onChange={(value) => {
								setAttributes({ entranceDelay: value });
							}}
						/>


						<TextControl
							label={ __('Entrance Stagger (seconds)', 'intro-to-filters') }
							type='number'
							placeholder='0.5'
							value={entranceStagger}
							onChange={(value) => {
								setAttributes({ entranceStagger: value });
							}}
						/>

					</PanelBody>
					
				</InspectorControls>
		</Fragment>

		
		);
	};
}, 'withInspectorControl');

addFilter(
	'editor.BlockEdit',
	'intro-to-filters/button-block/add-inspector-controls',
	addInspectorControl,
);










// Apply Our Set Values On Save
function wrapBlocksInAimationWrapper( element, blockType, attributes ) {
    // skip if element is undefined
    if ( ! element ) {
        return;
    }

	if(attributes.entranceAnimation === 'none' ) {
		attributes.entranceAnimation = null
	}

    // only apply allowed blocks
    if ( !allowedBlocks.includes(blockType.name)) {
        return element;
    }

	//if no animation or speed is set, return the element
	if(!attributes.entranceAnimation && !attributes.speed) {
		return element;
	}

    // return the element wrapped in a div
    return <div 
		data-scroll
		className={ attributes.entranceAnimation } 
		data-scroll-call={ attributes.entranceAnimation } 
		data-scroll-speed={ attributes.speed || null} 
		data-entrance-speed={ attributes.entranceSpeed || null}
		data-entrance-delay={ attributes.entranceDelay || null}
		data-entrance-stagger={ attributes.entranceStagger || null}
		>{ element }</div>;
}

wp.hooks.addFilter(
    'blocks.getSaveElement',
    'my-plugin/wrap-cover-block-in-container',
    wrapBlocksInAimationWrapper
);