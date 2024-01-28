import './TopicPage.css'
import Summary from './Summary'
import Carousel from './Carousel'
import Videos from './Videos'
import ReactCardCarousel from 'react-card-carousel';

function TopicPage({pageTitle, summarySubtitles, summaryContents, flashcardQuestions, flashcardAnswers}) {
    return (
        <div className="TopicPage">
            <h1 className="TopicPage-title">{pageTitle}</h1>

            <h2 className="TopicPage-subtitle">Summary</h2>
            <Summary subtitles={summarySubtitles} contents={summaryContents} />
            {/* <Summary subtitles={["first", "second"]} contents={["lsdjfdskjhfdsjkhf", "askjdashsd akjhdsakjhd kajsdhaskjdhakjhd"]} /> */}

            <h2 className="TopicPage-subtitle">Flashcards</h2>
            {/* <Carousel /> */}
            <div>
                <ReactCardCarousel autoplay={false}>
                    {flashcardQuestions.map((flashcardQuestion, index) => (
                        <Flashcard question={flashcardQuestion} answer={flashcardAnswers[index]} />
                    ))}
                </ReactCardCarousel>
            </div>

            <h2 className="TopicPage-subtitle">Related Videos</h2>
            <Videos />
        </div>
    )
}

export default TopicPage;