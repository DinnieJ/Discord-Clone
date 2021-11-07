import './App.css';
import './assets/main.scss'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import IndexPage from './pages';
import LoginPage from './pages/login'
import DefaultLayout from './layouts/default';
import AuthLayout from './layouts/auth';
import NotFound from './components/common/NotFound';
import DirectMessagePage from './pages/dm/_id';
import AuthRoute from './components/utils/AuthRoute';
import Snackbar from './components/common/Snackbar';

function App() {
  return (
    <div className="relative">
      <Snackbar/>
      <Router>
        <Switch>
          <Route exact path={['/', '/dashboard', "/dashboard/dm/:id"]}>
            <DefaultLayout>
              <AuthRoute path="/">
                <Redirect to="/dashboard" />
              </AuthRoute>
              <AuthRoute exact path="/dashboard">
                <IndexPage />
              </AuthRoute>
              <Route path="/dashboard/dm/:id">
                <DirectMessagePage />
              </Route>
            </DefaultLayout>
          </Route>

          <Route exact path={['/login']}>
            <AuthLayout>
              <Route exact path="/login">
                <LoginPage />
              </Route>
            </AuthLayout>
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router >
    </div>
  );
}

export default App;
