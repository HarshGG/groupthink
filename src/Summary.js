import './Summary.css'

function Summary({subtitles, contents}) {
    return (
        <div className="Summary">
            {subtitles.map((subtitle, index) => (
                <>
                    <h3 className="Summary-heading">{subtitle}</h3>
                    <p className="Summary-text">{contents[index]}</p>
                </>
            ))}
        </div>
    )
}

export default Summary;