class TODO extends Component {

    constructor(props){
        super(props);

        this.state = {
            isEdit: false
        }

    }

    changeMode(){

        if(this.state.isEdit){
            this.props.update(this.input.value)
        }else{
            this.setState({ isEdit: !this.state.isEdit })
        }

    }

    render(){
        
        const { title, id, text, onclick } = this.props;

        return (
            createElement(
                "div", 
                { 
                    className: "todo-root", 
                    "data-id": id,
                    style: {
                        border: "1px solid black"
                    }
                },
                createElement("h4", undefined, title),
                (
                    this.state.isEdit ? 
                    createElement("input", { value: text, ref: el => this.input = el }) :
                    createElement("p", undefined, text)
                ),
                createElement("div", null, 
                    createElement(
                        "button", 
                        { onclick: this.changeMode.bind(this) },
                        this.state.isEdit ? "SAVE" : "EDIT"
                    ),
                    createElement(
                        "button", 
                        { onclick: () => onclick(id) },
                        "Delete"
                    )
                )
            )
        )
    }
}