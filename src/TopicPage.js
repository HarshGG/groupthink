import './TopicPage.css'
import Summary from './Summary'
import Carousel from './Carousel'
import Videos from './Videos'

function TopicPage({pageTitle, summarySubtitles, summaryContents}) {
    return (
        <div className="TopicPage">
            <h1 className="TopicPage-title">{pageTitle}</h1>

            <h2 className="TopicPage-subtitle">Summary</h2>
            <Summary subtitles={summarySubtitles} contents={summaryContents} />

            <h2 className="TopicPage-subtitle">Flashcards</h2>
            <Carousel />

            <h2 className="TopicPage-subtitle">Related Videos</h2>
            <Videos />
        </div>
    )
}

export default TopicPage;