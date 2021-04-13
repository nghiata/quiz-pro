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

    btnStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10,
    }
}));

const QuizView = () => {
    const classes = useStyles();
    let [quiz, setQuiz] = React.useState({
        "question": "",
        "answers": []
    });
    const [error, setError] = React.useState(null);
    const [index, setIndex] = React.useState(0);

    const handleChange = (event) => {
        let newAnswer = parseInt(event.target.value);
        let newQuiz = { ...quiz, answer: newAnswer }
        setQuiz(newQuiz);
    };

    useEffect(() => {
        loadQuiz(index);
    }, [])

    const loadQuiz = (i) => {
        fetch('http://localhost:5000/api/quiz-pro')
            .then(res => res.json())
            .then(
                (res) => {
                    if (res) {
                        setQuiz(res[i])
                    }
                },
                (err) => {
                    setError(err)
                }
            )
    }

    let listAnswerView = '';
    let next_disabled = index > 1 ? true : false;
    let back_disabled = index === 0 ? true : false;
    if (quiz) {
        listAnswerView = (
            <RadioGroup aria-label="gender" name="gender1" value="" onChange={handleChange}>
                <FormControlLabel value={0} control={<Radio />} label={'A. ' + quiz['answers'][0]} />
                <FormControlLabel value={1} control={<Radio />} label={'B. ' + quiz['answers'][1]} />
                <FormControlLabel value={2} control={<Radio />} label={'C. ' + quiz['answers'][2]} />
                <FormControlLabel value={3} control={<Radio />} label={'D. ' + quiz['answers'][3]} />
            </RadioGroup>
        );
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
                    <Button variant="contained" color="primary" onClick={() => setIndex(index - 1)} disabled={back_disabled}>Back</Button>
                    <Button variant="contained" color="primary" onClick={() => setIndex(index + 1)} disabled={next_disabled}>Next</Button>
                </div>
            </Container>
        </Page>
    );
};

export default QuizView;
