jQuery(document).ready(function() {
  // Custom input type file design 
  jQuery('input[type="file"]').once().wrap('<div class="input-file"><div class="input-file-sub"></div></div>');
  jQuery('.input-file').once().prepend('<span class="input-file-name">File name here</span>');

  alert("I am an alert box!");
});