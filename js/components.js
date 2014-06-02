/** @jsx React.DOM */
var React = require('react'),
    $ = require('jquery');

var SelectBox = React.createClass({
    getInitialState: function(){
        return {isOpened: false};
    },
    componentWillMount: function(){
        $(document).click(this.closePopup);
    },
    componentDidMount: function(){
        $(this.getDOMNode())
                    .data("instance", this)
                    .find('.selectbox-text').text(this.props.defaultText);
        
    },
    closePopup: function(){
        if(this.state.isOpened){
            $(this.getDOMNode()).find('.selectbox-list').hide();
            this.setState({isOpened: false});
        }
    },
    viewOptionList: function(){
        this.setState({isOpened: true});
        $(this.getDOMNode()).find('.selectbox-list').show();
        return false;
    },
    setDefault: function(){
        this.props.elm.selectedIndex = -1;
        $(this.getDOMNode()).find('.selectbox-text').text(this.props.defaultText);
    },
    onItemSelect: function(item){
        var parent = $(this.getDOMNode());
        parent.find('.selectbox-list').hide();
        parent.find('.selectbox-text').text(item.text);
        this.props.elm.selectedIndex = item.index;
    },
    render: function() {
        var self = this;
        var optionNodes = this.props.data.map(function(option){
            return <SelectOption key={option.val} onItemSelect={self.onItemSelect} index={option.index} value={option.val}>{option.text}</SelectOption>;
        });

        return (
            <div className="selectbox">
                <div onClick={this.viewOptionList} className="selectbox-text"></div>
                <div className="selectbox-list">
                    {optionNodes}
                </div>
            </div>
        );
    }
});

var SelectOption = React.createClass({
    handleClick: function(){
        this.props.onItemSelect({index: this.props.index, text: this.props.children.toString()});
    },
    render: function(){
        return (
            <div onClick={this.handleClick} className="option">{this.props.children.toString()}</div>
        );
    }
});

$('select.fancy').each(function(){
    var ar = $(this).find('option[value]').map(function(){
                return {index: this.index, val: this.value, text: this.textContent};
            }).get(),
        s = this,
        container = $(this).before('<div class="container"/>').prev().get(0);
    
    React.renderComponent(
        <SelectBox defaultText={$(s).attr('data-placeholder') || ''} elm={s} data={ar} />,
        container
    );
});