<?php
/**
 * @author QantumThemes
 * Creates admin settings page
 */




/**
 * Create options page
 */
add_action('admin_menu', 'qt_kenthaplayer_create_optionspage');
if(!function_exists('qt_kenthaplayer_create_optionspage')){
	function qt_kenthaplayer_create_optionspage() {
		add_options_page('QT KenthaPlayer', 'QT KenthaPlayer', 'manage_options', 'qt_kenthaplayer_settings', 'qt_kenthaplayer_options');
	}
}

/**
 *  Main options page content
 */
if(!function_exists('qt_kenthaplayer_options')){
	function qt_kenthaplayer_options() {
		?>
		<h2>QT KenthaPlayer Settings</h2>
		<?php  
		/**
		 *  We check if the use is qualified enough
		 */
		if (!current_user_can('manage_options'))  {
			wp_die( __('You do not have sufficient permissions to access this page.') );
		}

		/**
		 *  Saving options
		 */
		
		$chackboxes = array(
			// "qt_kenthaplayer_autoplay" => esc_html__("Autoplay first track [only desktop and with Ajax plugin active]", "qt-kenthaplayer" ),
			"qt_kenthaplayer_waveform" => esc_html__("Display track waveform. Use for local MP3 only. Not for radios. If a track waveform is wrong: delete the MP3 from medias and re-upload. ", "qt-kenthaplayer" ),
			"qt_kenthaplayer_basicplayer" => esc_html__("Display music spectrum. Use for local MP3 only. Compatible with Chrome and Firefox. KENTHA RADIO: if you radio doesn't work, disable this.", "qt-kenthaplayer" ),
			"qt_kenthaplayer_hiquality" => esc_html__("High Quality FX (may slow down performance)", "qt-kenthaplayer" ),
			"qt_kenthaplayer_showplayer" => esc_html__("Show player at first opening", "qt-kenthaplayer" ),
			"qt_kenthaplayer_debug" => esc_html__("Enable debug in frontend (anybody can see it) and console error logs. Use in case of unexpected issues to provide the support additional information.", "qt-kenthaplayer" ),
		);

		$dropdown = array(
			"qt_kenthaplayer_template" => array(
				'label' => esc_html__("Template", "qt-kenthaplayer" ),
				'options' => array(
					'' => esc_html__('Default minimal player', 'qt-kenthaplayer'),
					'large' => esc_html__('Large player', 'qt-kenthaplayer'),
				),
			),
		);


		$textfields = array(
			// "qt_kenthaplayer_timeout_revote" => __("Time before adding new love (minutes)", "qt-kenthaplayer" ),
		);

		if ( ! empty( $_POST ) ) {
			if(!check_admin_referer( 'qt_kenthaplayer_save', 'qt_kenthaplayer_nonce' )){
				echo 'Invalid request';
			} else {
				foreach($dropdown as $varname => $label){
					if(isset($_POST[$varname])){
						update_option($varname, wp_kses($_POST[$varname], array() ));
					}
				}
				foreach($textfields as $varname => $label){
					if(isset($_POST[$varname])){
						update_option($varname, wp_kses($_POST[$varname], array() ));
					}
				}
				foreach($chackboxes as $varname => $label){
					if(isset($_POST[$varname])){
						if($_POST[$varname] == 'on'){
							update_option($varname, 1);
						} 
					} else {
						update_option($varname, 0 );
					}
				}
			}
		}

		/**
		 *  Options page content
		 */
		?>
		<div class="qt_kenthaplayer-framework qt_kenthaplayer-optionspage">
			<p class="right blue-grey-text lighten-3">V. <?php echo esc_attr(qt_kenthaplayer_get_version()); ?></p>
			<h2 class="qt_kenthaplayer-modaltitle"><?php echo esc_attr__("Instructions", "qt-kenthaplayer"); ?></h2>
			<ul>
				<li>
					<strong>Display music spectrum:</strong> available only if all your MP3s are in this same domain. If you want to link to MP3 from other domains, you can't display the music spectrum. Compatible with Chrome and Firefox. 
					<br><strong>IF USING KENTHA RADIO PLUGIN:</strong> some radio providers don't allow to read metadata. If you have problems with your radio and Kentha Radio plugin, disable the spectrum.
				</li>
				<li><strong>High quality spectrum analyzer:</strong> If "music spectrum" is enabled, this  option enables a deeper sound analysis on 3 levels, for an extra cool effect. It may slow down the page performance in conjunction with heavy pages or heavy/complex video backgrounds.
				</li>
			</ul>

			<h2 class="qt_kenthaplayer-modaltitle"><?php echo esc_attr__("Settings", "qt-kenthaplayer"); ?></h2>
			<div class="row">
				<form method="post" class="col s12" action="<?php echo esc_url($_SERVER["REQUEST_URI"]); ?>">

					<?php
					/**
					 * Dropdowns
					 * @var [type]
					 */
					foreach($dropdown as $varname => $vars){
						?>
						<p class="row">
							<label for="<?php echo esc_attr($varname); ?>"><?php echo esc_attr($vars['label']); ?></label><br>
							<select id="<?php echo esc_attr($varname); ?>" name="<?php echo esc_attr($varname); ?>">
								<?php  
								foreach( $vars['options'] as $option => $oplabel ){
									$selected = '';
									if( get_option( $varname ) == $option ){
										$selected = 'selected="selected"';
									}
									?>
									<option value="<?php echo esc_attr( $option ); ?>" <?php echo esc_attr( $selected ); ?>><?php echo esc_html__( $oplabel ); ?></option>
									<?php 
								}
								?>
							</select>
							Current: <?php echo esc_attr( get_option( $varname ) ); ?>
						</p>

					<?php } ?>



					<?php
					foreach($chackboxes as $varname => $label){
					?>
						<p class="row">
							<input id="<?php echo esc_attr($varname); ?>" name="<?php echo esc_attr($varname); ?>"  type="checkbox" <?php if (get_option( $varname)){ ?> checked <?php } ?>>
							<label for="<?php echo esc_attr($varname); ?>"><?php echo esc_attr($label); ?></label>
						</p>
					<?php } ?>
					<?php
					foreach($textfields as $varname => $label){
					?>
						<p class="row">
							<label for="<?php echo esc_attr($varname); ?>"><?php echo esc_attr($label); ?></label>
							<input id="<?php echo esc_attr($varname); ?>" name="<?php echo esc_attr($varname); ?>"  type="text" value="<?php echo esc_attr(get_option( $varname, 120)); ?>">
						</p>
					<?php } ?>
					<?php wp_nonce_field( "qt_kenthaplayer_save", "qt_kenthaplayer_nonce", true, true ); ?>
					<input type="submit" name="submit" value="Save"  class="button button-primary" />
				</form>
			</div>

			<h2 class="qt_kenthaplayer-modaltitle"><?php echo esc_attr__("Colors", "qt-kenthaplayer"); ?></h2>
			<p>Colors settings are available in Appearance > Customize > Player Settings > Player Colors</p>
			
		</div>
		<?php 
	}
}