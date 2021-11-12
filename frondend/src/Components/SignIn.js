import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router'
import '../Style/SignIn.css'
import { auth } from '../firebase/firebase'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@mui/material';

class SignIn extends React.Component {

   
    state = {
        user:{
            email: '',
            password:'',
        },
    };

    handleChange = (event) => {
         const{user}=this.state;
         user[event.target.name]=event.target.value;
         this.setState({user});
    }
     
    handleSubmit = (event) => {
        const {user}=this.state;
        event.preventDefault();
        console.log(user)
        auth.signInWithEmailAndPassword(user.email, user.password).then(() => { this.props.history.push('/Home')}).catch(() => {
            document.getElementById('alert').style.display = 'block';
            setTimeout(() => document.getElementById('alert').style.display = 'none', 2000);
        })
    }
    signup=(e)=>{
        this.props.history.push('/SignInform')
    }
 
    render() {
        const { user } = this.state;
        return (
            <div className='signin_container'>
                <div className='container1'>
                    <div className="container1__img">
                    </div>
                    <div className='container1__form'>
                        <div className='new__acount'>
                            <p className='new_account_signin'>Sign in</p>
                            <p className='signup-history'>Don’t have a account  <span className='new_account_signup' onClick={this.signup}> Sign up</span></p>
                        </div>
                        <div className='fields'>
                             
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.handleSubmit }
                                onError={errors => console.log(errors)}
                            >
                                <label className='field_label'>Email</label>
                                <TextValidator
                                    // label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={user.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                />
                                <label className='field_label'>Password</label>
                                 <TextValidator
                                    // label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={user.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    size="small"
                                    type='password'
                                    margin="dense"
                                    id="outlined-password-input"
                                    fullWidth
                                />

                                <div className='field_button'><button type="submit">Log in</button></div>
                                <div className='checkinfo'><FormGroup><FormControlLabel control={<Checkbox color="secondary" />} label="I agree to the terms and conditions"  /></FormGroup></div>
                            
                            </ValidatorForm>
                            
                        </div>

                    </div>
                </div>
                
            </div>

        );
    }
}

export default withRouter(SignIn);


