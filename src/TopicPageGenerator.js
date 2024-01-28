import TopicPage from './TopicPage'

function TopicPageGenerator() {
    let content = JSON.parse(localStorage.getItem('content'))

    return (
        <TopicPage pageTitle="test" summaryContents={["one"]} summarySubtitles={["two"]}/>
    )
}

export default TopicPageGenerator;