import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
const axios = require('axios');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class SocialLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false
        };
        this.signup = this.signup.bind(this);
    }
    signup(res, type) {
        let data;
        if (type === 'facebook' && res.email) {
            data = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            };
        }

        if (type === 'google' && res.Qs.zt) {
            data = {
                name: res.Qs.Te,
                provider: type,
                email: res.Qs.zt,
                provider_id: res.Qs.ER,
                access_token: res.accessToken,
                id_token: res.tokenId,
                provider_pic: res.Qs.EI
            };
        }  
        if (data) {
            //Make api call
            console.log("Make API Call");
            axios.post('http://localhost:8080/api/social-login', {
                data
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    render() {
        if (this.state.redirect || sessionStorage.getItem('userData')) {
            // return (<Redirect to={'/home'} />)
        }
        const responseFacebook = (response) => {
            console.log("facebook console");
            console.log(response);
            this.signup(response, 'facebook');
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response, 'google');
        }

        const { classes } = this.props;

        return (
            <>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FacebookLogin
                                appId="769431433961931"
                                autoLoad={false}
                                //buttonText="Facebook"
                                fields="name,email,picture"
                                callback={responseFacebook}
                                icon="fa-facebook"
                                size="small"
                                textButton="facebook"
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <GoogleLogin
                                clientId="837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} />
                        </Grid>

                    </Grid>
                </div>
            </>
        );
    }
}
export default withStyles(styles, { withTheme: true })(SocialLogin);