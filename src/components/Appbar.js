import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Drawer, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { DashboardSharp, LockOpen } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { Button,Select } from '@material-ui/core';
import { useTranslation,Trans } from 'react-i18next';



import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },

        languageDropDown : {
            backgroudColor: '#FFFFFF'
        }
    }),
);

export default function Appbar() {
    const {t, i18n } = useTranslation();
    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value)
        
        //console.log(t);
        //language = event.target.value
    }

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [lang, setLang] = React.useState(1);

    const langChange = (event) => {
        setLang(event.target.value);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Typography variant="h6" className={classes.title} noWrap>
                        <Trans i18nKey="title"></Trans>
                    </Typography>
                    

                    <Select
                        native
                        value={i18n.language}
                        onChange={changeLanguage}
                        className={classes.languageDropDown}
                        style={{backgroundColor:'#FFFFFF'}}
                        >
                        <option aria-label="None" value="" />
                        <option value={"en"}>ENGLISH</option>
                        <option value={"hi"}>HINDI</option>
                    </Select>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <MenuList>
                    <NavLink to="/">
                        <MenuItem>
                            <ListItemIcon>
                                <DashboardSharp fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Trans i18nKey="menus.home"></Trans>
                            </Typography>
                        </MenuItem>
                    </NavLink>

                    <NavLink to="/login">
                        <MenuItem>
                            <ListItemIcon>
                                <LockOpen fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>
                                <Trans i18nKey="menus.login"></Trans>
                        </Typography>
                        </MenuItem>
                    </NavLink>
                </MenuList>
                <Divider />
            </Drawer>
        </div>
    );
}