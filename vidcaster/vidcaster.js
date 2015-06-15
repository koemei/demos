//	Do the following when the document is ready
$(function() {
	
	if ($('#secondary-content-block').length > 0) {
		widgetResize();
	}
	searchFunction();
	searchBar();
	hoverMobileFix();
if ($('#home').length > 0 || $('#details').length > 0) {
		preventClick();

	}
});

// infinitescroll() is called on the element that surrounds 
// the items you will be loading more of

  $('.item-list').infinitescroll({
 
    navSelector  : "div.paginator",            
                   // selector for the paged navigation (it will be hidden)
    nextSelector : "span.paginate-next a",    
                   // selector for the NEXT link (to page 2)
    itemSelector : ".item-list > li",       
                   // selector for all items you'll retrieve,
    path: function generatePageUrl(currentPageNumber) { 
    		var getPath = $('.get_path').text();
            if (getPath == '/videos/search/') {
                return (getPath+ '?page='+currentPageNumber); 
            }
            else {
                return (getPath+ '?&selected_page=item_list&item_list_page='+currentPageNumber);
            }

    },
    loading: {
        finishedMsg: "",
        img: "/media/img/please-stand-by.gif",
        msgText: "Loading more videos..."
    }
  });   
function searchBar() {
	$('#search-input').focus(function() {
		$('#search-input').val('');
	});
}

// behavior fixes for :hover behavior on touch devices, to prevent the need for double clicking
function hoverMobileFix() {
    var is_touch_device = 'ontouchstart' in document.documentElement;
    if ( is_touch_device ) {
        $(".sort-links a").click(function(){ 
            $('.child-list').css('display','none');
        });
         $(".parent-list-link").click(function(){ 
            $(this).parent().children().css('display','block');
        });
        
        $('.content').delegate('.img', 'hover', function() {
            var el = $(this);
            var link = el.attr('href');
            window.location = link;
        });
    }
}

//prevent clicking on category header in dropdown
function preventClick() {
	$('.parent-list-link').click(function() {
			return false;
		});
}
//show search bar when you click the search icon
function searchFunction() {
        $('#search-trigger').click(function() {
            if ( $('#modal-backdrop').length < 1 ) {
                $('body').append('<div id="modal-backdrop"></div>');
                $('#modal-backdrop').click(function() {
                	$('#search').fadeOut();
                	$(this).fadeOut(function(){
                		$(this).remove();
                	});
                });
            }
            $('#search').fadeIn();
            return false;
        });	
}


//secondary content block widget resize for mobile devices
function widgetResize() {
		// Find all stuff
		var $allStuff = $("#secondary-content-block object, #secondary-content-block iframe, #secondary-content-block embed, #secondary-content-block video, #secondary-content-block div:first-child"),
	
			// The element that is fluid width
			$fluidThing = $("#secondary-content-block");
	
		// Figure out and save aspect ratio for each video
		$allStuff.each(function() {
	
			$(this)
				.data('aspectRatio', this.height / this.width)
	
				// and remove the hard coded width/height
				.removeAttr('height')
				.removeAttr('width');
	
		});
	
		// When the window is resized
		// (You'll probably want to debounce this)
		$(window).resize(function() {
	
			var newWidth = $fluidThing.width();
	
			// Resize all videos according to their own aspect ratio
			$allStuff.each(function() {
	
				var $el = $(this);
				$el
					.width(newWidth)
					.height(newWidth * $el.data('aspectRatio'));
	
			});
	
		// Kick off one resize to fix all videos on page load
		}).resize();
}
		
