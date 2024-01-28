import './Flashcard.css'

function Flashcard({question, answer}) {
    return (<>
        <p>{question}</p>
        <p>{answer}</p>
        </>)
}
export default Flashcard;