(function($) {
    "use strict";

    $("#btn-login").click(function(e) {
        e.preventDefault();

        $("#btn-login").attr( 'disabled', true );

        const _login = {
            username: 'pruebas',
            password: 'Primus123'
        }

        axios.post( '/login', _login)
        .then(r => {
            console.log(r.data);
        })
        .catch(err => {
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
        });

        $("#btn-login").attr('disabled', false);
	});
})(jQuery);