import './TopicPage.css'
import Summary from './Summary'
import Videos from './Videos'

function TopicPage({pageTitle, summarySubtitles, summaryContents}) {
    return (
        <div className="TopicPage">
            <h3 className="TopicPage-title">{pageTitle}</h3>

            <h4 className="TopicPage-subtitle">Summary</h4>
            <Summary subtitles={summarySubtitles} contents={summaryContents} />
            {/* <Summary subtitles={["first", "second"]} contents={["lsdjfdskjhfdsjkhf", "askjdashsd akjhdsakjhd kajsdhaskjdhakjhd"]} /> */}

            {/* <h2 className="TopicPage-subtitle">Flashcards</h2>
            {/* <Carousel /> */}
            {/* <div>
                <ReactCardCarousel autoplay={false}>
                    {flashcardQuestions.map((flashcardQuestion, index) => (
                        <Flashcard question={flashcardQuestion} answer={flashcardAnswers[index]} />
                    ))}
                </ReactCardCarousel>
            </div> */}

            <h2 className="TopicPage-subtitle">Related Videos</h2>
            <Videos prompt={pageTitle} />
        </div>
    )
}

export default TopicPage;