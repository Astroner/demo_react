const createElement = (tag="div", props={}, ...children) => {

    if(typeof tag === "function") {
        if(tag.isClass === true) {
            const instance = new tag(props);

            const result = instance.render();

            instance.bind(result)

            return result;
        }else{
            return tag(props)
        }
    }

    const el = document.createElement(tag);

    if(!!props)
        for(let key in props){

            if(key === "className"){

                el.setAttribute("class", props[key])

            }else if(key === "style") {

                if(typeof props[key] === "object"){
                    const styles = props[key];

                    for(let rule in styles) {
                        el.style[rule] = styles[rule];
                    }

                }else{
                    el.setAttribute(key, props[key])
                }

            } else if(key === "ref" && typeof props[key] === "function"){

                props.ref(el)

            } else {
                el[key] = props[key]
            }
        }

    insert(el, children)

    return el
}

function insert(target, items){

    items.forEach((item) => {

        if(item instanceof HTMLElement){

            target.appendChild(item);

        } else if(item instanceof Array){
            insert(target, item)
        } else {
            const text = new Text(item);
            
            target.appendChild(text)
        }
    })
}


class Component {

    static isClass = true;

    constructor(props){
        this.props = props;
    }

    setState(newState){
        this.state = Object.assign(this.state, newState);

        const render = this.render();

        this.ref.parentElement.insertBefore(render, this.ref)

        this.ref.remove();

        this.ref = render;

    }

    bind(ref){
        this.ref = ref;
    }

}