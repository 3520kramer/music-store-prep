<?php
function get_search_bar(string $placeholder)
{
  return <<<HTML
    <form class="search-form">
      <input type="text" name="query" id="query" placeholder="$placeholder" required />
      <input type="submit" alt="Submit" value="Search" />
    </form>

    <h3 hidden id="loading">Loading...</h3>
    <h4 hidden id="error">Something went wrong</h4>
HTML;
}
