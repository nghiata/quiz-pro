import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Typography
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
    }
}));

/* const QA = [
    {
        question: "Chemical formula of table salt?",
        description: ["NaCl", "NaOH", "NaNO3", "All wrongs"],
        answer: 1
    },
    {
        question: "Chemical formula of table salt?",
        description: ["NaCl", "NaOH", "NaNO3", "All wrongs"],
        answer: 1
    },
    {
        question: "Chemical formula of table salt?",
        description: ["NaCl", "NaOH", "NaNO3", "All wrongs"],
        answer: 1
    },
    {
        question: "Chemical formula of table salt?",
        description: ["NaCl", "NaOH", "NaNO3", "All wrongs"],
        answer: 1
    },
    {
        question: "Chemical formula of table salt?",
        description: ["NaCl", "NaOH", "NaNO3", "All wrongs"],
        answer: 1
    },
    {
        question: "Chemical formula of table salt?",
        description: ["NaCl", "NaOH", "NaNO3", "All wrongs"],
        answer: 1
    },
] */

const QuizView = () => {
    const classes = useStyles();
    let [quiz, setQuiz] = React.useState({});
    const [error, setError] = React.useState(null);

    const handleChange = (event) => {
        let newValue = parseInt(event.target.value);
        quiz.answer = newValue;
        setQuiz(quiz);
        // alert(value);
    };

    useEffect(() => {
        return () => {
            fetch('::5000/api/quiz-pro')
                .then(res => res.json())
                .then(
                    (res) => {
                        setQuiz(res)
                    },
                    (err) => {
                        setError(err)
                    }
                )
        }
    }, [])

    alert(JSON.stringify(quiz))

    return (
        <Page
            className={classes.root}
            title="Settings"
        >
            <Container maxWidth="lg">
                <Card>
                    <CardHeader title={quiz.question} />
                    <CardContent>
                        <RadioGroup aria-label="gender" name="gender1" value={quiz.answer} onChange={handleChange}>
                            <FormControlLabel value={0} control={<Radio />} label={'A. ' + quiz.description} />
                            <FormControlLabel value={1} control={<Radio />} label={'B. ' + quiz.description} />
                            <FormControlLabel value={2} control={<Radio />} label={'C. ' + quiz.description} />
                            {/* <FormControlLabel value={3} control={<Radio />} label={'D. '+ quiz.description[3]} /> */}
                        </RadioGroup>
                    </CardContent>
                </Card>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, }}>
                    <Button variant="contained" color="primary">Next</Button>
                </div>
            </Container>
        </Page>
    );
};

export default QuizView;
