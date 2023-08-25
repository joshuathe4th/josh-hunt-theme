<?php

/**
 * Filter for Scroll Animations
 *
 * A PHP approach of filtering block markup.
 *
 * @param  string $block_content Block content to be rendered.
 * @param  array  $block         Block attributes.
 * @return string
 */
function add_scroll_speed( $block_content = '', $block = [] ) {

	$disAllowedBlocks = [	
        'core/group',
	];

    $defaults = [
        'entranceAnimation' => null,
        'entranceSpeed' => null,
        'speed' => null
    ];


	// if block is in $disAllowedBlocks list
	if ( isset( $block['blockName'] ) && ! in_array($block['blockName'], $disAllowedBlocks)) {
        
		$args = wp_parse_args( $block['attrs'], $defaults );

		// if Has animation
		if(!is_null($args['entranceAnimation'])) {

            return '<div 
            class="' . $args['entranceAnimation'] . '"
            data-entrance-speed="' . $args['entranceSpeed'] . '"
            data-scroll-speed="' . $args['speed'] . '"
            >' . $block_content . '</div>';

		}
		else {
			//var_dump('else');
			return $block_content;
		}



	}
	return $block_content;
}

// Uncomment the following line to test this approach. Also don't forget to
// comment out the blocks.getSaveContent.extraProps filter in button-size.js
if ( ! is_admin() ) add_filter( 'render_block', __NAMESPACE__ . '\add_scroll_speed', 11, 2 );
