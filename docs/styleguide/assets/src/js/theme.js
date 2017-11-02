jQuery(document).ready(function() {
  // Custom input type file design 
  // jQuery('input[type="file"]').once().wrap('<div class="input-file"><div class="input-file-sub"></div></div>');
  // jQuery('.input-file').once().prepend('<span class="input-file-name">111File name here</span>');

	jQuery('.slider-two').slick({
	 	slidesToShow: 1,
	 	slidesToScroll: 1,
	 	fade: false,
	 	asNavFor: '.thumbnails-slider',
	});

	jQuery('.thumbnails-slider').slick({
	 	slidesToShow: 4,
	 	slidesToScroll: 1,
	 	asNavFor: '.slider-two',
	 	arrows: false,
	 	dots: false,
	 	//	centerMode: true,
	 	focusOnSelect: true
	});

	jQuery('.thumbnails-slider .slick-slide').removeClass('slick-active');

	jQuery('.thumbnails-slider .slick-slide').eq(0).addClass('slick-active');

	jQuery('.slider-two').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	 	var mySlideNumber = nextSlide;
	 	jQuery('.thumbnails-slider .slick-slide').removeClass('slick-active');
	 	jQuery('.thumbnails-slider .slick-slide').eq(mySlideNumber).addClass('slick-active');
	});

	jQuery('.slider').on('afterChange', function(event, slick, currentSlide){   
	  jQuery('.content').hide();
	  jQuery('.content[data-id=' + (currentSlide + 1) + ']').show();
	});
	// End
});