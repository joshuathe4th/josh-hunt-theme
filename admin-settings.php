<?php
/**
 * Theme Settings Page
 */

// Register the admin page
function theme_settings_page() {
    add_menu_page(
        'Multisite Theme Settings',
        'Theme Settings',
        'manage_options',
        'theme-settings',
        'theme_settings_page_content',
        'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.663 136.073"><path fill="#2f2f2f" d="M117.132 32.899 60.863.411a3.061 3.061 0 0 0-3.063 0L1.531 32.899A3.064 3.064 0 0 0 0 35.55v64.973a3.064 3.064 0 0 0 1.531 2.653L57.8 135.663a3.059 3.059 0 0 0 3.063 0l56.269-32.491a3.064 3.064 0 0 0 1.531-2.653V35.55a3.064 3.064 0 0 0-1.531-2.653ZM42.824 52.133l28.807 15.7-28.807 15.7ZM32.47 108.659l-13.07-7.6 2.6-1.5 10.47-5.706Zm0-19.481L15 98.699l-3.666-2.041a2.793 2.793 0 0 1-1.444-2.34V40.499a2.86 2.86 0 0 1 1.506-2.34l2.913-1.569 18.156 9.9Zm0-47.361-13.893-7.573 13.9-8.081Zm76.3 53.128a2.655 2.655 0 0 1-1.3 2.34L60.9 124.194a2.42 2.42 0 0 1-2.545 0l-15.538-9.151V88.374l4.222-2.466 28.875-15.737 32.851 17.9Zm0-11.541L80.2 67.835l28.564-15.57Zm0-35.811L75.917 65.499 42.824 47.461V21.029l15.545-9.151a2.167 2.167 0 0 1 2.4 0l46.622 26.91a2.73 2.73 0 0 1 1.38 2.34Z" data-name="Path 237"/></svg>')
    );
}
add_action('admin_menu', 'theme_settings_page');

// Callback function to render admin page content
function theme_settings_page_content() {
    ?>
    <div class="wrap">
        <h2>Multisite Theme Settings</h2>
        <form method="post" action="options.php">
            <?php
                settings_fields('theme-settings-group');
                do_settings_sections('theme-settings');
                submit_button();
            ?>
        </form>
    </div>
    <?php
}

// Initialize settings and fields
function theme_settings_init() {
    add_settings_section(
        'theme-settings-section',
        'General Settings',
        'theme_settings_section_callback',
        'theme-settings'
    );

    add_settings_field(
        'text_field_1',
        'Text Field 1',
        'text_field_1_callback',
        'theme-settings',
        'theme-settings-section'
    );

    add_settings_field(
        'text_field_2',
        'Text Field 2',
        'text_field_2_callback',
        'theme-settings',
        'theme-settings-section'
    );

    register_setting(
        'theme-settings-group',
        'text_field_1'
    );

    register_setting(
        'theme-settings-group',
        'text_field_2'
    );
}
add_action('admin_init', 'theme_settings_init');

// Callback functions for text fields
function text_field_1_callback() {
    $value = get_option('text_field_1');
    echo '<input type="text" name="text_field_1" value="' . esc_attr($value) . '" />';
}

function text_field_2_callback() {
    $value = get_option('text_field_2');
    echo '<input type="password" name="text_field_2" value="' . esc_attr($value) . '" />';
}

// Display the settings section
function theme_settings_section_callback() {
    echo 'Configure your Theme Settings here.';
}
