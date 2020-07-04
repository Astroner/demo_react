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

        if(!title || !text) return 

        this.setState({
            list: this.state.list.concat({
                id: this.lastId++,
                title, 
                text
            })
        })
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
                createElement(
                    CreationForm,
                    { onClick: this.addElement.bind(this) }
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