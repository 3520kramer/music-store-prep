<?php
//include local vars file if it exists = Development mode
//else config vars will be set when deployed

$local_vars_file_path = __DIR__ . '/local_vars.php';
if (file_exists($local_vars_file_path)) {
  include_once $local_vars_file_path;
}

class Env
{
  public static $ROOT_DIR;

  public static function set_env_vars()
  {
    static::$ROOT_DIR = getenv('ROOT_DIR');
  }
}
