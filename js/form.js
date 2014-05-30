var $ = require('jquery');

module.exports = {
    init: function($form){
        this.$form = $form;
        this.$form.submit($.proxy(this.onSubmit, this))
                .on('blur', 'textarea', function(){
                    $(this)[((this.value != '') ? 'addClass' : 'removeClass')]('is-stretched');
                });
    },
    onSubmit: function(e){
        e.preventDefault();

        if(this.check()){
            this.clean();
            this.onSuccess();
        }
    },
    check: function(){
        return true;
    },
    clean: function(){
        this.$form[0].reset();
        this.$form.find('.selectbox').each(function(){
            var selectbox = $(this).data("instance");
            selectbox.clear();
        });
    },
    onSuccess: function(){
        
    }
}