import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import {addNewFeedback} from '../../store/modules/feedbacks';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
        margin: "50px auto"
    },
    input: {
        width: '100%',
        margin: '10px 0'
    }
  }),
);


const NewFeedback = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [currentEmail, setEmail] = useState("");
    const [currentName, setName]= useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({name: "", email: "", comment: ""});
    const [snackbarEnabled, enableSnackBar ] = useState(false);

    const submitForm = () => {
        dispatch(addNewFeedback({
            name: currentName,
            email: currentEmail,
            comment
        })).then(() => {
            setEmail("");
            setName("");
            setComment("");
            setErrors({name: "", email: "", comment: ""});
            enableSnackBar(true);
        });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleOnBlur = (e) => {

        if(e.target.value.length === 0){
            return setErrors({
                ...errors,
                [e.target.name] : "This field is required"
            })
        }
        
        if(e.target.name === "email" && e.target.value.length > 0){

            const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail = regEx.test(e.target.value);

            if(!isValidEmail){
                return setErrors({
                    ...errors,
                    "email" : "Please enter a valid email"
                })
            }
        }

        return setErrors({
            ...errors,
            [e.target.name] : ""
        });
    };

    const redirectToHome = () => {
        props.history.push("/");
    }

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Card >
                <CardContent>
                    <TextField 
                        label="Name" 
                        name="name"
                        variant="outlined" 
                        className={classes.input}
                        onChange={handleNameChange}
                        required
                        error={errors.name.length > 0}
                        helperText={errors.name}
                        onBlur={handleOnBlur}
                    />
                    <TextField 
                        label="Email"
                        name="email"
                        variant="outlined" 
                        className={classes.input}
                        onChange={handleEmailChange}
                        required
                        onBlur={handleOnBlur}
                        error={errors.email.length > 0}
                        helperText={errors.email}
                    />
                    <TextField 
                        label="Comment" 
                        name="comment"
                        variant="outlined" 
                        multiline
                        rows={4}
                        className={classes.input}
                        onChange={handleCommentChange}
                        required
                        onBlur={handleOnBlur}
                        error={errors.comment.length > 0}
                        helperText={errors.comment}
                    />
                </CardContent>
                <CardActions>
                    <Button 
                        color="primary" 
                        variant="contained"
                        onClick={submitForm}
                        disabled={
                            // this can be written in a better way. But in the interest of time
                            currentName === "" || 
                            currentEmail === "" || 
                            comment === "" || 
                            errors.name.length > 0 || 
                            errors.email.length > 0 || 
                            errors.comment.length > 0
                        }
                    >
                        Submit Feedback
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical:'top', horizontal: 'right'}}
                open={snackbarEnabled}
                autoHideDuration={6000}
                message="Feedback Submitted"
                action={(
                    <Button color="secondary" size="small" onClick={redirectToHome}>
                        Go to Home
                    </Button>
                )}
                key={'top' + 'right'}
            />
        </Container>
    )
};

export default NewFeedback;