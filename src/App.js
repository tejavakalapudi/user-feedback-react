import { Route, Link, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import FeedbacksContainer from './components/Feedbacks';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Feedbacks
          </Typography>
          <Button color="inherit">
            <Link to="/feedbacks">Home</Link>
          </Button>
          <Button color="inherit">
            <Link to="/feedbacks/new">Create New</Link>
          </Button>
        </Toolbar>
      </AppBar>
  
      <Switch>
        <Route exact path="/" component={FeedbacksContainer} />
        <Route path="/feedbacks" component={FeedbacksContainer} />
      </Switch>
    </div>
  )
};

export default App;
