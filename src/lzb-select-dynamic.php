<?php
/**
 * Plugin Name:  Lzb Select Dynamic
 * Description:  lazy-blocks custom control to offer a dynamic select containing wordpress posts, pages or categories
 * Plugin URI:   https://github.com/janwidmer/lzb-select-dynamic
 * Version:      1.1.3
 * Author:       Jan Widmer
 * Author URI:   https://github.com/janwidmer
 * License:      GPLv2 or later
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  lzb-select-dynamic
 *
 * @package lzb-select-dynamic
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * ww_Lzb_Plugin_select_dynamic Class
 */
class ww_Lzb_Plugin_select_dynamic {

    /**
     * Plugin Path.
     *
     * @var string
     */
    public static $plugin_path;

    /**
     * Plugin URL.
     *
     * @var string
     */
    public static $plugin_url;

    /**
     * ww_Lzb_Plugin_select_dynamic constructor.
     */
    public function __construct() {}

    /**
     * Init.
     */
    public static function init() {
        add_action( 'init', array( 'ww_Lzb_Plugin_select_dynamic', 'plugins_loaded' ), 11 );
    }

    /**
     * Init of LazyBlocks available.
     */
    public static function plugins_loaded() {
        if ( ! class_exists( 'LazyBlocks' ) ) {
            return;
        }

        self::$plugin_path = plugin_dir_path( __FILE__ );
        self::$plugin_url  = plugin_dir_url( __FILE__ );

        // Translations.
        load_plugin_textdomain( 'lzb-select-dynamic', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

        // Include control.
        include_once self::$plugin_path . '/controls/select-dynamic.php';
    }
}

ww_Lzb_Plugin_select_dynamic::init();
