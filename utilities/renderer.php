<?php
    // require_once(realpath(dirname(__FILE__) . "/../config.php"));
    require_once __DIR__ . '/constants.php';

    /* File path to js should be relative to */
    function render_header_with_js(string $js_file_path)
    {
        require_once('./views/header.php');
    }