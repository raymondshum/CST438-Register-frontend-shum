import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddStudentButton from './components/AddStudentButton';
import AddStudentPage from './components/AddStudentPage';
import StudentCreatedSuccess from './components/StudentCreatedSuccess';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Course Registration
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path ='/'>
          <AddStudentButton />
          <Semester />
        </Route>
        <Route path='/schedule' component={SchedList} />
        <Route path='/addStudent' component={AddStudentPage} />
        <Route path='/addStudentSuccess' component={StudentCreatedSuccess} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;