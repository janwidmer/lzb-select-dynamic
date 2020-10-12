<?php
/**
 * Select Dynamic Control.
 *
 * @package lzb-select-dynamic
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'ww_Lzb_Control_select_dynamic' ) ) :
    /**
     * ww_Lzb_Control_select_dynamic class.
     *
     * LazyBlocks_Control - https://github.com/nk-o/lazy-blocks/blob/master/src/controls/_base/index.php
     */
    class ww_Lzb_Control_select_dynamic extends LazyBlocks_Control {
        /**
         * Constructor
         */
        public function __construct() {
            // Control unique name.
            $this->name = 'select_dynamic';

            // Control icon SVG.
            // You may use these icons https://material.io/resources/icons/?icon=accessibility&style=outline .
            $this->icon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z"/></svg>';

            // Control value type [string, number, boolean].
            $this->type = 'string';

            // Control label.
            $this->label = __( 'Select Dynamic', 'lzb-select-dynamic' );

            // Category name [basic, content, choice, advanced, layout]
            // How to add custom category - https://lazyblocks.com/documentation/php-filters/lzb-controls-categories/
            $this->category = 'choice';

            // Add/remove some options from control settings.
            // More options see in https://github.com/nk-o/lazy-blocks/blob/master/src/controls/_base/index.php .
            $this->restrictions = array(
                'default_settings'              => true,
                'help_settings'                 => true,
                'placement_settings'            => array( 'content', 'inspector' ),
                'width_settings'                => true,
                'required_settings'             => true,
                'hide_if_not_selected_settings' => true,
            );

            // Optional additional attributes, that will be saved in control data.
            $this->attributes = array(
                'select_dynamic_custom_attribute' => 'default_value',
            );

            parent::__construct();
        }

        /**
         * Register control assets.
         */
        public function register_assets() {
            wp_register_script(
                'ww-lzb-control-select_dynamic',
                ww_Lzb_Plugin_select_dynamic::$plugin_url . 'assets/js/select-dynamic.min.js',
                array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components' ),
                '1.0.0',
                true
            );
            wp_register_style(
                'ww-lzb-control-select_dynamic',
                ww_Lzb_Plugin_select_dynamic::$plugin_url . 'assets/css/select-dynamic.min.css',
                array(),
                '1.0.0'
            );
        }

        /**
         * Enqueue control scripts.
         *
         * @return array script dependencies.
         */
        public function get_script_depends() {
            return array( 'ww-lzb-control-select_dynamic' );
        }

        /**
         * Enqueue control styles.
         *
         * @return array style dependencies.
         */
        public function get_style_depends() {
            return array( 'ww-lzb-control-select_dynamic' );
        }
    }

    // Init.
    new ww_Lzb_Control_select_dynamic();
endif;
