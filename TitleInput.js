const TitleInput = ({ title, ref }) => (
    createElement("div", null,
        createElement("h5", null, title),
        createElement("input", { ref })
    )
)