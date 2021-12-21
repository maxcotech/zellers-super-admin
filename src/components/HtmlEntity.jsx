const HtmlEntity = (props) => {
    return (
        <span dangerouslySetInnerHTML={{__html:props.children ?? ""}}></span>
    )
}

export default HtmlEntity;