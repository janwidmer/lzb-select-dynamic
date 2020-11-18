# Lazy Blocks: Select Dynamic Control

* Contributors: janwidmer
* Tags: lazy-blocks, lazy blocks, custom control, select dynamic
* Requires at least: 5.5
* Tested up to: 5.5.3
* Requires PHP: 5.5.9
* Stable tag: 1.1.1
* License: GPLv2 or later
* License URI: <http://www.gnu.org/licenses/gpl-2.0.html>

lazy-blocks custom control to offer a dynamic select containing wordpress posts, pages or categories

## Description

This custom control enhances the great [Lazy Blocks Plugin](https://lazyblocks.com/) and can be used in blocks to offer 
the Wordpress Author to choose either wordpress posts, pages or categories.

### Features

* The custom control dynamically renders a select with options based on the chosen `entityType`
* Available entity types are
  * Posts (Default or Custom post types)
  * Pages
  * Taxonomies (Tags or Categories)
* The select options can be restricted to use a certain page / category as parent

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

### Restrictions

The custom control is using the `getEntityRecords` method. 

* This method can load a maximum of 100 entities and render them as dropdown options
* When choosing the entity type `Pages`, depending on the number of pages you have, the first time, the call might take 
  a while, as the whole page object get's loaded

## Changelog

= 1.1.1 =

* Enhancement to offer custom post types and tags / categories as entity

= 1.0.0 =

* Initial Release
