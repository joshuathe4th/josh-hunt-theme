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
function add_block_link( $block_content = '', $block = [] ) {

	$disallowedBlocks = [	

	];

    $defaults = [
        'linkValue' => null,
    ];


	// if block isnt in $allowedBlocks list
	if ( isset( $block['blockName'] ) && !in_array($block['blockName'], $disallowedBlocks)) {
        
		$args = wp_parse_args( $block['attrs'], $defaults );

		// if Has animation
		if(!is_null($args['linkValue'])) {

            return '<a
            href="' . $args['linkValue'] . '" class="wrapped-link-block"
            >' . $block_content . '</a>';

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
if ( ! is_admin() ) add_filter( 'render_block', __NAMESPACE__ . '\add_block_link', 11, 2 );
