# Lazy Blocks: Select Dynamic Control

* Contributors: janwidmer
* Tags: lazy-blocks, lazy blocks, custom control, select dynamic
* Requires at least: 5.8
* Tested up to: 5.8.2
* Requires PHP: 7.2
* Stable tag: @@plugin_version
* License: GPLv2 or later
* License URI: <http://www.gnu.org/licenses/gpl-2.0.html>

lazy-blocks custom control to offer a dynamic select containing wordpress posts, pages or categories

## Description

This custom control enhances the great [Lazy Blocks Plugin](https://lazyblocks.com/) and can be used in blocks to offer 
the Wordpress Author to choose either wordpress posts, pages or categories.

### Features

* The custom control dynamically renders a select with options based on the chosen `entityType`
* Available entity types are
  * Post Type
  * Taxonomy Type
  * Post (Default or Custom post types)
  * Page
  * Taxonomy (Tags, Categories, Custom Taxonomy)
* The select options can be restricted to use a certain entry as parent

### Restrictions

The custom control is using the `getEntityRecords` method.

* This method can load a maximum of 100 entities and render them as dropdown options
* When choosing the entity type `Page`, depending on the number of pages you have, the first time, the call might take
  a while, as the whole page object get's loaded
* To use a custom taxonomy type, make sure to activate the REST option in the `register_taxonomy` function by adding `'show_in_rest' => true,`
* Parent Entity Restriction does only work for Pages / Categories / Custom Taxonomies, as other Entity Types (e.g. Posts / Tags) cannot be nested
* For the `entityType` `post-type`, an ignore list excludes all wordpress related post types:
  * `pages`, `media`, `blocks`, `menu-items`, `navigation`, `templates`, `template-parts`, `lazyblocks`, `lazyblocks_templates`

## Installation

* Make sure you use WordPress 5.0.x. As alternative you need to install the 
  [Gutenberg plugin](https://wordpress.org/plugins/gutenberg/) to use Lazy Blocks.
* Make sure, you have installed the [Lazy Blocks Plugin](https://lazyblocks.com/)

### Automatic installation

Automatic installation is the easiest option as WordPress handles the file transfers itself and you don’t need to 
leave your web browser. To do an automatic install of lzb-select-dynamic, log in to your WordPress dashboard, 
navigate to the Plugins menu and click Add New.

In the search field type lzb-select-dynamic and click Search Plugins. Once you’ve found our plugin you can view details 
about it such as the point release, rating and description. Most importantly of course, you can install it by simply 
clicking “Install Now”.

### Manual installation

The manual installation method involves downloading our lzb-select-dynamic plugin and uploading it to your webserver 
via your favourite FTP application. The WordPress codex contains 
[instructions on how to do this here](https://codex.wordpress.org/Managing_Plugins#Manual_Plugin_Installation).

## Usage

You can use the custom control exactly how you use normal controls for lazy blocks

## Changelog

= 2.2.0 =

* Add more post types to ignore list, add docs about ignore list
* changed compatibility to WP version to 5.9.0

= 2.1.5 =

* changed compatibility to WP version to 5.8.2

= 2.1.4 =

* changed minimal WP version to 5.8
* changed minimal PHP version to 7.2

= 2.1.0 =

* Enhancement to have Taxonomy Type as an option 

= 2.0.0 =

* BREAKING: rename options, enhance with "Post Type" option to select a certain Post type in your block. Manual Migration needed!

= 1.1.4 =

* Enhancement to offer custom post types and tags / categories as entity

= 1.0.0 =

* Initial Release
