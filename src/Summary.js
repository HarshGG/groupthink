import './Summary.css'

function Summary({subtitles, contents}) {
    return (
        <div className="Summary" dangerouslySetInnerHTML={{__html: subtitles}}/>
    )
}

export default Summary;