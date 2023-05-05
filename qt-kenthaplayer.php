<?php  
/*
Plugin Name: QT KenthaPlayer
Plugin URI: http://qantumthemes.com
Description: Adds special music player to the Kentha theme
Version: 3.0.9
Author: QantumThemes
Author URI: http://qantumthemes.com
Text Domain: qt-kenthaplayer
Domain Path: /languages
*/


define('KENTHAPLAYER_VERSION', '3.0.4');


/**
 *
 *	The plugin textdomain
 * 
 */
if(!function_exists('qt_kenthaplayer_td')){
function qt_kenthaplayer_td() {
  load_plugin_textdomain( 'qt-kenthaplayer', FALSE, basename( dirname( __FILE__ ) ) . '/languages' );
}}
add_action( 'plugins_loaded', 'qt_kenthaplayer_td' );

/**
* Returns current plugin version.
* @return string Plugin version. Needs to stay here because of plugin file path
*/
if(!function_exists('qt_kenthaplayer_get_version')){
function qt_kenthaplayer_get_version() {
	if ( is_admin() ) {
		$plugin_data = get_plugin_data( __FILE__ );
		$plugin_version = $plugin_data['Version'];
	} else {
		$plugin_version = get_file_data( __FILE__ , array('Version'), 'plugin');
	}
	return $plugin_version;
}}

/**
* Flash URL
* @return string Plugin version. Needs to stay here because of plugin file path
*/
if(!function_exists('qt_kenthaplayer_flashurl')){
function qt_kenthaplayer_flashurl() {
 	return plugins_url( '/assets/soundmanager/swf/' , __FILE__ );
}}



/**
 * 	Plugin URL to get blank sound
 *  since 2020 07 04
 * 	=============================================
 */
if(!function_exists('qt_kenthaplayer_blanksound_url')){
function qt_kenthaplayer_blanksound_url(){
	return plugin_dir_url( __FILE__ ) . 'assets/blank.mp3';
}}

/**
 * 	includes
 * 	=============================================
 */
include ( plugin_dir_path( __FILE__ ) . 'inc/_qt-musicplayer.php');
include ( plugin_dir_path( __FILE__ ) . 'inc/_qt-musicplayer-admin.php');
include ( plugin_dir_path( __FILE__ ) . 'inc/_qt-cache-spectrum.php');
include ( plugin_dir_path( __FILE__ ) . 'inc/_json.php');

/**
 * 	includes
 * 	=============================================
 */
if(!function_exists('qt_kenthaplayer_scripts')){
function qt_kenthaplayer_scripts(){
	$deps = array('jquery', 'kentha-qt-main-script');
	$ver = qt_kenthaplayer_get_version();
	wp_register_script( 'kenthaplayer-waveform', plugins_url('/assets/js/kenthaplayer-waveform.js' , __FILE__ ), $deps, $ver, true );
	// Localize the script for ajax calls
	wp_localize_script('kenthaplayer-waveform', 'ajax_var', array(
	    'url' => admin_url('admin-ajax.php'),
	    'nonce' => wp_create_nonce('ajax-nonce')
	));
	wp_enqueue_script('kenthaplayer-waveform');  $deps[] = 'kenthaplayer-waveform';


	wp_enqueue_script( 'kenthaplayer-min', 	plugins_url('/assets/js/min/qt-musicplayer-min.js'	, __FILE__ ), $deps, $ver, true );
	
}}
add_action("wp_enqueue_scripts",'qt_kenthaplayer_scripts');















