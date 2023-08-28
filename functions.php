<?php


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_gutenpride_block_init() {
	//register_block_type( __DIR__ . '/build/block-scroll-text' );
}
add_action( 'init', 'create_block_gutenpride_block_init' );

// Manage Updates
require_once get_template_directory() . '/updater.php';

// Include Theme Files FRONTEND
add_action( 'wp_enqueue_scripts', function(){
	wp_enqueue_script( 'ScriptsJS', get_template_directory_uri() . '/build/scripts.js', array(), wp_get_theme()->get( 'Version' ), false );
	wp_enqueue_style( 'StyleCSS', get_template_directory_uri() . '/build/style-scripts.css', array( ), wp_get_theme()->get( 'Version' ), false);
} );

// Include Theme Files ADMIN
add_action( 'admin_enqueue_scripts', function(){
	wp_enqueue_script( 'EditorJS', get_template_directory_uri() . '/build/editor.js', array('lodash'), wp_get_theme()->get( 'Version' ), true );
	wp_enqueue_style( 'EditorCSS', get_template_directory_uri() . '/build/editor.css', '', wp_get_theme()->get( 'Version' ), false);
} );

// Animation Filters
require_once get_template_directory() . '/animation-filters.php';

//Link Filters
require_once get_template_directory() . '/link-filters.php';

//Page Slug Body Class
function add_slug_body_class( $classes ) {
	global $post;
	if ( isset( $post ) ) {
	$classes[] = $post->post_type . '-' . $post->post_name;
	}
	return $classes;
	}
add_filter( 'body_class', 'add_slug_body_class' );

//Allow svg 
function huntsman_enable_SVG( $upload_mimes ) {
    $upload_mimes['svg'] = 'image/svg+xml';
    $upload_mimes['svgz'] = 'image/svg+xml';
    return $upload_mimes;
}
add_filter( 'upload_mimes', 'huntsman_enable_SVG', 10, 1 );


// Load GSAP
wp_enqueue_script(
	'gsap',
	'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
	[ ],
	'3.11.5'
);

wp_enqueue_script(
	'tweenmax',
	'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js',
	[ ],
	'3.11.5'
);

// Load Scroll Trigger
wp_enqueue_script(
	'scroll-trigger',
	'https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js',
	[],
	'3.11.5'
);


//Prevent FOUC
function huntsman_prevent_fouc($classes) {
    $classes[] = 'is-loading';
    return $classes;
}
add_filter('body_class', 'huntsman_prevent_fouc');



// Current Year Shortcode
function current_year_shortcode() {
    $year = date('Y');
    return $year;
}
add_shortcode('year', 'current_year_shortcode');


// Replace Menu SVG with custom Icon
function custom_render_block_core_navigation (string $block_content, array $block)
{
	if (
		$block['blockName'] === 'core/navigation' && 
		!is_admin() &&
		!wp_is_json_request()
	) {
		return preg_replace('/\<svg width(.*?)\<\/svg\>/', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 22" style="width:80px"><g data-name="Group 337"><path d="M50 2H0V0h50Z" data-name="Line 34"/><path d="M50 12H0v-2h50Z" data-name="Line 35"/><path d="M50 22H0v-2h50Z" data-name="Line 36"/></g></svg>', $block_content);
	}

	return $block_content;
}

add_filter('render_block', 'custom_render_block_core_navigation', null, 2);





/**
 * 
 * Theme Customizations
 * 
 */


/**
 * Load Lottie
 */
function lottieJS() {
        
	echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.6.6/lottie.min.js"></script>';
	echo '<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>';
	//echo '<script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"></script>';
	

}
add_action('wp_head', 'lottieJS', 100);




/**
 * Add color styling from theme 
		
 */
function joshhunt_page_color() {
	$post_id = get_queried_object_id();


	
        $color = get_field('page_color', $post_id); 

		if($color === '' || $color === null) {
			$color = '#fff';
		}
        $custom_css = "<style>

	
				
				:root{
					--page-color: {$color};

					
				} </style>
				";
        
		echo $custom_css;

		$pages = get_pages();
			$nav_colors = '<style>:root{';
			foreach($pages as $page) {
				
				$nav_colors .= '--' . $page->post_name . ':' . get_field('page_color', $page->ID) . ';';
			}
			$nav_colors .= '}</style>';
			echo $nav_colors;


}
add_action('wp_head', 'joshhunt_page_color', 100);




function add_menu_colors( $block_content = '', $block = [] ) {

	$allowedBlocks = [	
	'core/navigation-link',
	];
	// if block is in $allowedBlocks list
	if ( isset( $block['attrs']['id'] ) && in_array($block['blockName'], $allowedBlocks)) {
		$content = '<div data-color="'. get_field('page_color', $block['attrs']['id']) .'">';
		$content .= $block_content;
		$content .= '</div>';
		return $content;
		}
	return $block_content;
}

// Uncomment the following line to test this approach. Also don't forget to
// comment out the blocks.getSaveContent.extraProps filter in button-size.js
if ( ! is_admin() ) add_filter( 'render_block', __NAMESPACE__ . '\add_menu_colors', 10, 2 );


//Portfolio Shortcode
require_once get_template_directory() . '/portfolio-shortcode.php';