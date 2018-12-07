<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Enqueue Gutenberg block assets for frontend and backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function nishiki_blocks_editor_assets() {
	// Scripts.
	wp_register_script(
		'nishiki-blocks-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_register_style(
		'nishiki-blocks-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array()
//		array( 'wp-edit-blocks' )
	);

	// Front End Styles.
	wp_register_style(
		'nishiki-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array()
	// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);

	if( function_exists( 'register_block_type' ) ){
		register_block_type( 'nishiki/balloon', array(
			'editor_script'     => 'nishiki-blocks-js',
			'editor_style'      => 'nishiki-blocks-editor-css',
			'style'             => 'nishiki-blocks-style-css',
		) );

		register_block_type( 'nishiki/frame', array(
			'editor_script'     => 'nishiki-blocks-js',
			'editor_style'      => 'nishiki-blocks-editor-css',
		) );

		register_block_type( 'nishiki/section', array(
			'editor_script'     => 'nishiki-blocks-js',
			'editor_style'      => 'nishiki-blocks-editor-css',
		) );
	}
}

// Hook: Frontend and Editor assets.
add_action( 'init', 'nishiki_blocks_editor_assets' );

// Add Block Category.
function nishiki_blocks_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'nishiki-blocks',
				'title' => __( 'Nishiki Blocks（Beta）', 'nishiki' ),
				'icon'  => 'grid-view',
			),
		)
	);
}
add_filter( 'block_categories', 'nishiki_blocks_categories', 10, 2 );
