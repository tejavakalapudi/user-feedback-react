import React from 'react';
import {useSelector} from 'react-redux';
import { createSelector } from 'reselect';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const selectFeedbacks = createSelector(
    state => state.feedbackStore,
    feedbackStore => feedbackStore.feedbacks
);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
        margin: "50px auto"
    },
    table: {
        minWidth: 650,
    },    
  })
);

const FeedbacksView = () => {
    const classes = useStyles();
    const feedbacks = useSelector(selectFeedbacks);

    return (
            <Container className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Feedback</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                feedbacks.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                        {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.comment}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
    )
};

export default FeedbacksView;