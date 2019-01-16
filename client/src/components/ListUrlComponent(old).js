/*eslint react/jsx-filename-extension: 0 */
/*eslint react/prop-types: 0 */
/* eslint array-callback-return:0 */

import "isomorphic-fetch";
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Clear from '@material-ui/icons/Clear';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import moment from 'moment';

import HomePageComponent from './HomePageComponent';
import '../styles/ListUrlComponent.css';
import * as Rx from 'rxjs-compat'
// const publicIP = require('public-ip');
// const data = require('../logs/client-server-db-docker.log');

const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class ListUrlComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            data: [],
            expanded: {},
            ipaddress: '',
        };
    }

    state = {
        open: false,
    };
    handleToggle = (cardNumber) => {
        this.setState(state => ({
            [cardNumber]: !state.open[cardNumber]
        }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    handleExpandClick = (cardNumber) => {
        this.setState({
            expanded: {
                ...this.state.expanded,
                [cardNumber]: !this.state.expanded[cardNumber]
            }
        });
    };

    componentWillMount() {
        Rx.Observable.fromPromise(fetch('/apps').then((data) => data.json()))
            .subscribe((data) => {
                console.log("data fetched", data);

                console.log('viewing dep history', data[0].deploy_history)
                // data[0].deploy_history = data[0].deploy_history.splice(0,1);
                // console.log('viewing spliced dep history', data[0].deploy_history)
                var temp = data[0].deploy_history;
                temp = temp.reverse();
                temp = temp.splice(0, temp.length - 1);
                data[0].deploy_history = temp;
                this.setState({
                    data: data
                })

            });
    }

    handleDownloadLog = (x, item) => {
        // console.log('inside test function', x);
        fetch(`/downloadLog/${x.app_name}/${item}`)
            .then((data) => {
                data.blob();
                // console.log("data: ", data)
                window.open(data.url)
            })
            .then(resp => {
                // console.log("this is resp: ", resp);
                return resp;
            });

    }

    render() {
        const { data, expanded } = this.state;
        const { classes } = this.props;
        const { open } = this.state;

        // this.state.data.map((x, i) => {
        //   x.timestamp = moment(x.timestamp).fromNow();
        // }
        // )
        // publicIP.v4().then(ip => {
        //   this.setState({
        //     ipaddress: ip,
        //   })
        // })
        // console.log(data)

        // x.deploy_history.splice(0,1);

        return (
            <div>
                <HomePageComponent />
                {data.map((x, i) =>
                    <div className="root">
                        <Card className="card">
                            {/* {console.log('name is: ', x.deploy_history)} */}
                            {/* {console.log('map i', i)} */}

                            <CardHeader
                                action={
                                    <Avatar aria-label="Deployed" className="checkavatar"
                                        style={{ color: "yellowgreen", marginRight: 40, marginTop: 13 }} >

                                        {/* {console.log("id check: ", typeof (x.appId), " ", x.appId)} */}
                                        {x.appId === "-1" ?
                                            <Clear style={{ color: "red" }} /> :
                                            <CheckCircle style={{ color: "green" }} />
                                        }
                                    </Avatar>
                                }
                                className="appinfo"
                                title={x.app_name}
                                subheader={moment(x.timestamp).fromNow()}

                            />

                            {/* <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: expanded[i],
                })}
                //className={this.state.expanded[i] ? classes.expandOpen : "toggleContent-closed"}
                onClick={() => this.handleExpandClick(i)}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton> */}

                            <div className={classes.root}>
                                <div>
                                    <Button className="download"
                                        buttonRef={node => {
                                            this.anchorEl = node;
                                        }}
                                        aria-owns={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={() => this.handleToggle(i)}
                                    >
                                        Download previous logs &nbsp;
            <i class="fa fa-chevron-down fa-list"></i>
                                    </Button>
                                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                id="menu-list-grow"
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={this.handleClose}>


                                                        <MenuList>

                                                            {x.deploy_history.map((item, index) =>

                                                                <MenuItem onClick={() => this.handleDownloadLog(x, item)}>{item}</MenuItem>

                                                            )}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </div>

                            <Button variant="persistent"
                                className="download" onClick={() => this.handleDownloadLog(x, x.timestamp)}>
                                Download recent log  </Button>
                            <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                                <CardContent>
                                </CardContent>
                            </Collapse>


                        </Card>
                    </div>
                )
                }
                <div className="deploybutton">
                    <Button variant="persistent" href='http://enginedeploy.com' target="_blank">
                        View Client-DB-Docker</Button>

                    <Button variant="persistent" href='http://githubDemo.com' target="_blank">
                        View Deployment-testing</Button>
                </div>
            </div>
        );
    }
}
//export default (ListUrlComponent);
export default withStyles(styles)(ListUrlComponent);