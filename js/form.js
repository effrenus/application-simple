var $ = require('jquery');

module.exports = {
    init: function($form){
        this.$form = $form;
        this.$form.submit($.proxy(this.onSubmit, this))
                .on('blur', 'textarea', function(){
                    $(this)[((this.value != '') ? 'addClass' : 'removeClass')]('is-stretched');
                });
        this.$form.parent().on('click', '.fill-form', $.proxy(this.viewForm, this));
    },
    viewForm: function(){
        this.clean();
        this.$form.parent().removeClass('is-sended');
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
            selectbox.setDefault();
        });
    },
    onSuccess: function(){
        this.$form.parent().addClass('is-sended');
    }
}