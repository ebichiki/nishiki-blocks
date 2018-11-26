<?php
/**
 * Plugin Name: Nishiki Blocks
 * Plugin URI:
 * Description: Gutenberg extension block for Nishiki theme
 * Author: s56bouya
 * Author URI: https://www.imamura.biz/blog/
 * Version: 1.0.4
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
