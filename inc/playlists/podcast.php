<?php





/**
 * =================================================
 * Kentha preload podcast
 * =================================================
 * @since 1.9.0
 * @var array
 * Featured releases by ID
 */
$featureds = get_theme_mod( 'kentha_player_podcastfeatured' );
$ids_featured = false;
if ($featureds){
	$ids_featured = str_replace(' ', '', $featureds);
	$args = array (
		'post_type' =>  'podcast',
		'post__in'=> explode(',',$ids_featured),
		'orderby' => 'post__in',
	);  
	$wp_query = new WP_Query( $args );
	if ( $wp_query->have_posts() ) : while ( $wp_query->have_posts() ) : $wp_query->the_post();
		$post = $wp_query->post;
		setup_postdata( $post );
		get_template_part('phpincludes/part-playlist-podcast' );  
	endwhile; endif; 
	wp_reset_postdata();
}

/**
 * Default release extraction
 * @since 1.0.0
 */
$releases_amount = intval( get_theme_mod( 'kentha_player_podcastamount', '1' ) );
if ($releases_amount !== 0){
	$args = array(
		'post_type' => 'podcast',
		'ignore_sticky_posts' => 1,
		'post_status' => 'publish',
		'orderby' => array ( 'menu_order' => 'ASC', 'date' => 'DESC'),
		'suppress_filters' => false,
		'posts_per_page' => $releases_amount, // @since 1.9.0
		'paged' => 1,
		'meta_query' => array(
			array(
				'key' => '_podcast_resourceurl',
				'value' => '.mp3',
				'compare' => 'LIKE'
			)
		)
	);

	/**
	 * Remove featured IDS from the result to avoid duplicates
	 * @since 1.9.0
	 */
	if( $ids_featured ){
		$args['post__not_in'] = explode(',',$ids_featured);
	}
	$wp_query = new WP_Query( $args );
	if ( $wp_query->have_posts() ) : while ( $wp_query->have_posts() ) : $wp_query->the_post();
		$post = $wp_query->post;
		setup_postdata( $post );
		get_template_part('phpincludes/part-playlist-podcast' );  
	endwhile; endif; 
	wp_reset_postdata();
}


/**
 * =================================================
 * END OF Kentha preload podcast
 * =================================================
 */

?>