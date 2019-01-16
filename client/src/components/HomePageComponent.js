/*eslint react/jsx-filename-extension: 0 */

import React from 'react';
import "isomorphic-fetch"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as Rx from 'rxjs-compat';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';



class HomePageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listdata: [],
      data: [],
      url: "",
      status: false,
      open: false
    };
  }

  componentWillMount() {
    Rx.Observable.fromPromise(fetch('/profile')
      .then((data) => data.json())
      .then((data) => {
        if (!data.status) {
          window.location.assign(`http://localhost:5000/#/`)
        }
        else {
          return data;
        }
      }
      )
    )
      .subscribe((data) => {
        console.log('in subscribe', data)
        this.setState({
          data: data,
          status: data.status,
          url: data.testdata.avatar_url
        })
      }
      )
  }

  handleToggle = () => {
    // this.setState(state => ({ open: !state.open }));
    this.setState(prevState => ({
      open: !prevState.open
    }))
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    // this.setState({ open: false });
    this.setState(prevState => ({
      open: !prevState.open
    }))
  };

  render() {

    const { open } = this.state;
    return (

      <div className="root">

        <AppBar position="static" className="app" >
          <Toolbar className="iconss">
            <Link to={`/home`} className="lnk">
              <IconButton className="menuButton" color="inherit" aria-label="Menu">
                <Home />
              </IconButton>
            </Link>
            <Link to={`/listUrl`} className="lnk">
              <Typography variant="h6" color="inherit" className="grow">
                App
          </Typography>
            </Link>
            <Link to={`/newApp`} className="lnk">
              <Typography variant="h6" color="inherit" className="grow">
                NewApp
          </Typography>
            </Link>

            {/* <span className="heading">
          Rx-Actor Model</span> */}


            <div className="root">
              <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                className="button2"
                variant="persistent"
              >
                <Avatar
                  alt="Thumb"
                  // src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
                  src={this.state.url}

                />
                &nbsp;&nbsp;
                <i class="fa fa-chevron-down"></i>
              </Button>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal className="profiledata">
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <h3><strong>{this.state.data.testdata.name}</strong></h3>
                          <div className="username">@{this.state.data.testdata.username}
                            <br /> {this.state.data.testdata.email}
                          </div>
                          <hr />
                          <Button href={this.state.data.testdata.web_url} target="_blank"
                            className="buttonmenu" >
                            <MenuItem>Go to gitlab</MenuItem></Button>
                          <Button href={`/logout`} className="buttonmenu" target="_self">
                            <MenuItem>Logout</MenuItem></Button>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>


          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default (HomePageComponent);