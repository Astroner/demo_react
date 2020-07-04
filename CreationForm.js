class CreationForm extends Component {

    add(e){
        e.preventDefault();
        this.props.onClick(this.title.value, this.text.value)
    }

    render(){
        return (
            createElement("form", undefined,
                createElement(TitleInput, { title: "title", ref: el => this.title = el }),
                createElement(TitleInput, { title: "text", ref: el => this.text = el }),
                createElement("button", { type: "submit", onclick: this.add.bind(this) }, 
                    "Add TODO"
                )
            )
        )
    }
}