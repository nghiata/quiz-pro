import React, { useEffect } from 'react';
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
} from '@material-ui/core';
import Page from '../../../components/Page';

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

    buttonStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 10,
    }
}));

const QuizView = () => {
    const classes = useStyles();
    const [quiz, setQuiz] = React.useState({});
    const [error, setError] = React.useState(null);

    const handleChange = (event) => {
        let newAnswer = parseInt(event.target.value);
        let newQuiz = { ...quiz, answer: newAnswer }
        setQuiz(newQuiz);
    };

    useEffect(() => {
        loadQuiz()
    }, [])

    const loadQuiz = () => {
        fetch('http://localhost:5000/api/quiz-pro')
            .then(res => res.json())
            .then(
                (res) => {
                    res[0].answer = ""
                    setQuiz(res[0])
                },
                (err) => {
                    setError(err)
                }
            )
    }

    let listAnswerView = ''
    if (quiz.description) {
        listAnswerView = (
            <RadioGroup aria-label="gender" name="gender1" value={quiz.answer} onChange={handleChange}>
                <FormControlLabel value={0} control={<Radio />} label={'A. ' + quiz.description[0]} />
                <FormControlLabel value={1} control={<Radio />} label={'B. ' + quiz.description[1]} />
                <FormControlLabel value={2} control={<Radio />} label={'C. ' + quiz.description[2]} />
            </RadioGroup>
        )
    }


    return (
        <Page
            className={classes.root}
            title="Settings"
        >
            <Container maxWidth="lg">
                <Card>
                    <CardHeader title={quiz.question} />
                    <CardContent>
                        {listAnswerView}
                    </CardContent>
                </Card>
                <div className={classes.buttonStyle}>
                    <Button variant="contained" color="primary">Next</Button>
                </div>
            </Container>
        </Page>
    );
};

export default QuizView;
