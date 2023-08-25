<?php 


/* Register [entrata_floorplans style="" property=""] shortcode */
function portfolio_shortcode_fn( $atts ) {
    

	$atts=shortcode_atts(
        array(
			'limit' => -1,
        ), $atts, 'entrata_floorplans');


		ob_start();


    echo '<div id="portfolio">';

    $posts = get_posts(array(
      'numberposts' => $atts['limit'],
    ));

		foreach($posts as $post) {
      $blocks = parse_blocks( $post->post_content );
      $content = '';
      // Set attrinbutes
      foreach( $blocks as $block ) {
        // Content
        if( 'core/paragraph' === $block['blockName'] || 'core/heading' === $block['blockName'] || 'core/list' === $block['blockName']) {
          $content .= render_block($block);
        }
        // Button
        if( 'core/buttons' === $block['blockName'] ) {
          $button = render_block($block);
        }
        // Gallery Img Array
        if( 'core/gallery' === $block['blockName'] ) {
          $gallery = $block;
        }
      }
      $title = get_post_field( 'post_title', $post);
      $slug = get_post_field( 'post_name', $post);
      $post_categories = get_the_category( $post);
   

      $featured_img = get_the_post_thumbnail( $post, 'medium-large', array( 'class' => 'portfolio-img' ) );

      $color = get_field('page_color', $post); 

      // Create array from gallery images
      $galleryHTML = '';
      foreach($gallery['innerBlocks'] as $image) {
        $galleryHTML .= '<img class="gallery-item button" src="' . wp_get_attachment_image_url($image['attrs']['id'], 'large') . '">';
      }
     // echo '<pre>' , var_dump($gallery) , '</pre>';



echo '    
<div id="' . $slug . '" class="portfolio-item" data-module-portfolio="" style="--color: ' . $color . '">
<div class="close-button button gal-btn"></div>
<div class="portfolio-wrapper">
    ' . $featured_img . '
    
    <div class="portfolio-titles">
        <div class="c-heading -h3 portfolio-title ">
        ' . $title . '
        </div>
        <div class="c-heading -h1 portfolio-title-scroll h-scroll--negative" data-scroll data-scroll-css-progress></div>
        
        <div class="c-heading portfolio-type h-scroll" data-scroll data-scroll-css-progress>
           ' . $post_categories[0]->name. '
        </div>
    </div>

    <div class="portfolio-info o-layout -flex">
        <div class="description o-layout_item"><p>
        '. $content .'
        </p></div>
        <div class="action o-layout_item">
        
        ' . $button . '
        </div>
    </div>
   
    <div class="portfolio-gallery">
    ' .  $galleryHTML  . '
    </div>
</div>
</div>

';




		}

    echo '</div>';
	
		return ob_get_clean();


	}

add_shortcode('portfolio', 'portfolio_shortcode_fn');
