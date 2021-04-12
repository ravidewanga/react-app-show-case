import React, { Component } from 'react';
import ReactDOM from "react-dom";
import SocialLogin from '../components/SocialLogin';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
const axios = require('axios');

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends Component {

    constructor(props) {
        super();
        this.state = {
            email: '',emailTouched:false,
            password: '',passwordTouched:false,
            errors: {}
        }
    }

    evenHandler = (event) => {
        const fieldName = event.target.name;
        const fieldVal = event.target.value;
        this.setState({
            [fieldName]: fieldVal
        })
    }
    handleOnInputBlur = (event) => {
        const field_name = event.target.name;
        const state = this.state;
        const errors = this.validate(state);
        this.setState({
            errors: { ...errors, [field_name]: errors[field_name] }
        })
    }

    validate = () => {
        const errors = {};
        if (this.state.email == '') {
            errors.email = 'This field is required.';
        }else if(!this.state.email.includes('@')){
            errors.email = 'Please enter valid email address.';
        }
        if (this.state.password == '') {
            errors.password = 'This field is required.';
        }
        return errors;
    }

    handleOnSubmit = event => {
        event.preventDefault();
        const errors = this.validate(this.state);
        if (errors && Object.keys(errors).length !== 0) {
            this.setState({ errors });
            return;
        }
        this.setState({ errors: {} });
        //Make api call
        console.log("Make API Call");
        axios.post('/login', {
            email: this.state.email,
            password: this.state.password
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;
        const {errors,email,password } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleOnSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onBlur={this.handleOnInputBlur}
                            onChange={this.evenHandler}
                            helperText={errors.email}
                            error={errors.email}
                        />
                        
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onBlur={this.handleOnInputBlur}
                            onChange={this.evenHandler}
                            helperText={errors.password}
                            error={errors.password}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <b>OR</b>
                        </Grid>
                        <br />
                        <SocialLogin />

                        <br /><br />
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}
export default withStyles(styles, { withTheme: true })(SignIn);