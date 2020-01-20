(function($) {
    "use strict";

    $('#error-msg').hide();

    $("#btn-login").click(function(e) {
        e.preventDefault();
        
       $('#form-login').submit();
	});
})(jQuery);