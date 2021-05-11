import React, { useEffect } from 'react'
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
} from '@material-ui/core'
import Page from '../../../components/Page'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center'
    },

    btnStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10,
    }
}));

const QuizView = () => {
    const classes = useStyles();
    const [quizCollection, setQuizCollection] = React.useState([{
        "question": "",
        "answers": [],
        "your-answer": "",
        "correct-answer": ""
    }])
    const [quiz, setQuiz] = React.useState(quizCollection[0]);
    const [error, setError] = React.useState(null)
    const [index, setIndex] = React.useState(0)

    const handleChange = (event) => {
        let newAnswer = parseInt(event.target.value)
        let newQuiz = { ...quiz, 'your-answer': newAnswer }
        setQuiz(newQuiz)
    };

    useEffect(() => {
        loadQuizCollection()
        if (quizCollection.length) {
            setQuiz(quizCollection[0])
        }
    }, [])

    const loadQuizCollection = () => {
        fetch('http://localhost:5000/api/quiz-pro')
            .then(res => res.json())
            .then(
                (res) => {
                    if (res) {
                        setQuizCollection(res)
                    }
                },
                (err) => {
                    setError(err)
                    alert('error: '+ err)
                }
            )
    }

    const loadQuiz = (i) => {
        setQuiz(quizCollection[i])
    }

    let listAnswerView = ''
    let next_disabled = index > 0 ? true : false // need total of questions
    let back_disabled = index === 0 ? true : false
    if (quiz) {
        let radioItems = quiz['answers'].map((answer, index) => (
            <FormControlLabel key={index} value={index} control={<Radio />} label={ String.fromCharCode(index + 65) +'. '+ answer } />
        ))
        listAnswerView = (
            <RadioGroup aria-label="gender" name="gender1" value={quiz['your-answer']} onChange={handleChange}>
                { radioItems }
            </RadioGroup>
        );
    }

    const loadQuestion = async (index) => {
        await setIndex(index)
        await loadQuiz(index)
    }

    return (
        <Page
            className={classes.root}
            title="Settings"
        >
            <Container maxWidth="lg">
                <Card>
                    <CardHeader title={quiz['question']} />
                    <CardContent>
                        {listAnswerView}
                    </CardContent>
                </Card>

                <div className={classes.btnStyle}>
                    <Button variant="contained" color="primary" onClick={() => loadQuestion(index - 1)} disabled={back_disabled}>Back</Button>
                    <Button variant="contained" color="primary" onClick={() => loadQuestion(index + 1)} disabled={next_disabled}>Next</Button>
                </div>
            </Container>
        </Page>
    );
};

export default QuizView;
