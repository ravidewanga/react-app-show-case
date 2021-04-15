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
        super(props);
        this.state = {
            formValues: {
                email: "",
                password: ""
            },
            formErrors: {
                email: "",
                password: ""
            },
            formValidity: {
                email: false,
                password: false
            },
            isSubmitting: false
        };
    }

    handleChange = ({ target }) => {
        const { formValues } = this.state;
        formValues[target.name] = target.value;
        this.setState({ formValues });
        this.handleValidation(target);
    };

    handleValidation = target => {
        const { name, value } = target;
        const fieldValidationErrors = this.state.formErrors;
        const validity = this.state.formValidity;
        const isEmail = name === "email";
        const isPassword = name === "password";
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        validity[name] = value.length > 0;
        fieldValidationErrors[name] = validity[name]
            ? ""
            : `${name} is required and cannot be empty`;

        if (validity[name]) {
            if (isEmail) {
                validity[name] = emailTest.test(value);
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be a valid email address`;
            }
            if (isPassword) {
                validity[name] = value.length >= 8;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 8 characters minimum`;
            }
        }

        this.setState({
            formErrors: fieldValidationErrors,
            formValidity: validity
        });
    };


    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        const { formValues, formValidity } = this.state;
        if (Object.values(formValidity).every(Boolean)) {
            //alert("Form is validated! Submitting the form...");
            console.log(formValues);
            axios.post('http://localhost:8080/api/login', {
                email: formValues.email,
                password: formValues.password
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            this.setState({ isSubmitting: false });
        }else{
            for (let key in formValues) {
                let target = {
                    name: key,
                    value: formValues[key]
                };
                this.handleValidation(target);
            }
            this.setState({ isSubmitting: false });
        }
    };

    render() {
        const { formValues, formErrors, isSubmitting } = this.state;
        const { classes } = this.props;
        const { errors, email, password } = this.state;
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
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
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
                            helperText={formErrors.email}
                            error={formErrors.email}
                            onChange={this.handleChange}
                            value={formValues.email}

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
                            helperText={formErrors.password}
                            error={formErrors.password}
                            onChange={this.handleChange}
                            value={formValues.password}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            disabled={isSubmitting}
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