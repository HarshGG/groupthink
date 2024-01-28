import './TopicPage.css'
import Summary from './Summary'
import Videos from './Videos'
import Carousel from './Carousel'

function TopicPage({ pageTitle, summarySubtitles, summaryContents }) {

    var data = {
        "Q1" : "A1",
        "Q2" : "A2",
        "Q3" : "A3",
        "Q4" : "A4",
        "Q5" : "A5",
    }

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

            <h2 className="TopicPage-subtitle">Flashcards</h2>
            <Carousel data={data}/>

            <h2 className="TopicPage-subtitle">Related Videos</h2>
            <Videos prompt={pageTitle} />


        </div>
    )
}

export default TopicPage;