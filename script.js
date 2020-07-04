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
                        this.state.isEdit ? "NE_EDIT" : "EDIT"
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

const TitleInput = ({ title, ref }) => (
    createElement("div", null,
        createElement("h5", null, title),
        createElement("input", { ref })
    )
)

class TodoList extends Component {

    constructor(props){
        super(props);

        this.lastId = 0;

        this.state = {
            value: "",
            list: []
        }
    }

    deleteItem(itemId){
        this.setState({
            list: this.state.list.filter(item => item.id !== itemId)
        })
    }

    addElement(title, text){
        this.setState({
            list: this.state.list.concat({
                id: this.lastId++,
                title, 
                text
            })
        })
    }

    change(event){
        this.setState({
            value: event.target.value
        })
    }

    add(e){
        e.preventDefault();
        this.addElement(this.title.value, this.text.value)
    }

    putText(itemID, newText){
        this.setState({
            list: this.state.list.map(item => {
                if(item.id !== itemID) return item;
                return {
                    ...item,
                    text: newText
                }
            })
        })
    }

    render(){

        const { list } = this.state;

        return (
            createElement("div", { className: "list-root" },
                createElement("form", undefined,
                    createElement(TitleInput, { title: "title", ref: el => this.title = el }),
                    createElement(TitleInput, { title: "text", ref: el => this.text = el }),
                    createElement("button", { type: "submit", onclick: this.add.bind(this) }, 
                        "Add TODO"
                    )
                ),
                list.map(datum => (
                    createElement(
                        TODO, 
                        {
                            title: datum.title,
                            id: datum.id,
                            text: datum.text,
                            onclick: this.deleteItem.bind(this),
                            update: (text) => this.putText(datum.id, text)
                        }
                    )
                ))
            )
        )
    }
}

document.body.appendChild(
    createElement(
        TodoList
    )
)