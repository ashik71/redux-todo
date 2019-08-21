import React from 'react';

import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#fafafa'
    },
    appbar: {
        alignItems: 'center',
        textTransform: 'uppercase'
    },
    paper: {        
        padding: '0',
        margin: '0',
        backgroundColor: '#fafafa'
    }
});

const Layout = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Paper       
            className={classes.paper}
        >
            <AppBar color="primary" position="static" style={{ height: 64 }} className={classes.appbar}>
                <Toolbar style={{ height: 64, textAlign:"center" }}>
                    <Typography color="inherit">Redux To-Do</Typography>
                </Toolbar>
            </AppBar>            
        </Paper>
        {props.children}
        </div>
        
    );
}


export default Layout;