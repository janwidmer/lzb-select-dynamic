// eslint-disable-next-line import/no-extraneous-dependencies
const pkg = require( 'json-file' ).read( './package.json' ).data;

const cfg = {};

// Build Paths.
cfg.name = 'lzb-select-dynamic';
cfg.src = './src';
cfg.dist_root = './dist';
cfg.dist = '{dist_root}/{name}';

// Template variables that will be automatically replaced.
cfg.template_files_src = '{dist}/**/*.{md,php,js,css,pot,json}';
cfg.template_files_variables = {
    text_domain: pkg.name,
    plugin_version: pkg.version,
    plugin_name: pkg.name,
    plugin_title: pkg.title,
    plugin_author: pkg.author,
};

// Copy files.
cfg.copy_files_src = [
    '{src}/**/*',
    '!{src}/**/*.{js,jsx,scss}',
    '{src}/**/vendor/**/*.{js,jsx,scss}',
];

// Compile SCSS files.
cfg.compile_scss_files_src = [
    '{src}/**/*.scss',
    '!{src}/**/vendor/**/*',
];

// Compile JSX files.
cfg.compile_jsx_files_src = [ '{src}/*assets/js/select-dynamic.jsx' ];

// Correct line endings files.
cfg.correct_line_endings_files_src = '{dist}/**/*.{js,css}';

// Translate PHP files.
cfg.translate_php_files_src = '{dist}/**/*.php';
cfg.translate_php_files_dist = `{dist}/languages/${ cfg.template_files_variables.plugin_name }.pot`;
cfg.translate_php_options = {
    domain: cfg.template_files_variables.text_domain,
    package: cfg.template_files_variables.plugin_title,
    lastTranslator: cfg.template_files_variables.plugin_author,
    team: cfg.template_files_variables.plugin_author,
};

// ZIP files.
cfg.zip_files = [
    {
        src: '{dist}/**/*',
        src_opts: {
            base: '{dist_root}',
        },
        dist: '{dist_root}/{name}.zip',
    },
];

// Watch files.
cfg.watch_files = [ '{src}/**/*', '!{src}/**/*.{jsx,js,scss}' ];

cfg.watch_js_files = [ '{src}/**/*.js', '!{src}/*vendor/**/*' ];

cfg.watch_jsx_files = [ '{src}/**/*.jsx', '{src}/**/*.scss', '!{src}/*vendor/**/*' ];

cfg.watch_scss_files = '{src}/**/*.scss';

module.exports = cfg;
