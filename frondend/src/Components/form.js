import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import '../Style/form.css'
import { useHistory } from 'react-router';
import { auth, db } from '../firebase/firebase'
import { Add__User } from '../redux-store/Actions'
import Alert__Error from './Alert';
import { useEffect } from 'react';
import Step1 from './step1';
import Multistep from 'react-multistep';
import { Step } from '@mui/material';


function SignInform() {
    const UserList = useSelector(state => state.UserList);
    const dispatch = useDispatch();
    const history = useHistory();
    const [Email, SetEmail] = React.useState('');
    const [Password, SetPassword] = React.useState('');
    const [Fname, SetFname] = React.useState('');
    const [Lname, SetLname] = React.useState('');
    const [Cnic, SetCnic] = React.useState('');
    const [Contact, SetContact] = React.useState('');
    const [Count, SetCount] = React.useState(0);

    const steps = [
        { name: 'step1', component: <Step1 /> },
        { name: 'step2', component: <Step1 /> },
    ];

    const submitform = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(Email, Password);
        console.log(Fname);
        dispatch(Add__User({ Email: Email, Password: Password, Cnic: Cnic, Contact: Contact, Fname: Fname, Lname: Lname }));
        console.log("dispatched");
        if (Count == 0) {
            db.collection('UserList').add(
                { Email: Email, Password: Password, Cnic: Cnic, Contact: Contact, Fname: Fname, Lname: Lname }
            ).then(() => history.push("/")).catch((error) => console.log(error))
        }
        else {
            document.getElementById('alert').style.display = 'block';
            setTimeout(() => document.getElementById('alert').style.display = 'none', 2000);
        }


    }
    useEffect(() => {
        db.collection('UserList').where('Cnic', '==', Cnic).get().then(querySnapshot => {
            let doc = querySnapshot.docs;
            SetCount(doc.length);
            console.log("length is :", doc.length)
            console.log("Count is:", Count);
        })
    }, [Cnic])
    const btnclick1 = (event) => {
        event.preventDefault();
        document.getElementById('btn1').style.display = 'none';
        document.getElementById('btn2').style.display = 'block';
    }
    const btnclick2=(event)=>{
        event.preventDefault();
        document.getElementById('btn2').style.display='none';
        document.getElementById('btn3').style.display='block';
    }
    return (
        // <div className='bg-form'>
        // <div className="SignInform">
        //     <h2 className="form__logo">Property Ticket</h2>
        //     <form onSubmit={submitform} id="form">
        //         <div className="text"><TextField onChange={e => SetFname(e.target.value)} label="First Name" variant="standard" required fullWidth inputProps={{ pattern: "[a-z-A-Z]{3,8}" }} placeholder="Contains 3 to 8 letters" /></div>
        //         <div className="text"><TextField onChange={e => SetLname(e.target.value)} label="Last Name" variant="standard" name="lname" required fullWidth inputProps={{ pattern: "[a-z-A-Z]{3,8}" }} placeholder="Contains 3 to 8 letters" /></div>
        //         <div className="text"><FormLabel component="legend">Gender</FormLabel>
        //             <RadioGroup name="radio-buttons-group" defaultValue="female" row aria-label="gender">
        //                 <FormControlLabel value="female" control={<Radio />} label="Female" />
        //                 <FormControlLabel value="male" control={<Radio />} label="Male" />
        //                 <FormControlLabel value="other" control={<Radio />} label="Other" />
        //             </RadioGroup></div>
        //         <div className="text"><TextField onChange={e => SetEmail(e.target.value)} label="Email" variant="standard" required fullWidth type="email" inputProps={{ pattern: ".+@gmail.com" }} placeholder="xyz5@gmail.com" /></div>
        //         <div className="text"><TextField type="password" onChange={e => SetPassword(e.target.value)} label="Password" variant="standard" required fullWidth /></div>
        //         <div className="text"><TextField onChange={e => SetCnic(e.target.value)} label="CNIC" variant="standard" required fullWidth placeholder="XXXXX-XXXXXXX-X" inputProps={{ pattern: "[0-9]{5}-[0-9]{7}-[0-9]{1}" }} /></div>
        //         <div id="alert" style={{ display: 'none' }}>
        //             <Alert__Error title="Enter Valid Cnic!" />
        //         </div>
        //         <div className="text"><TextField onChange={e => SetContact(e.target.value)} label="Contact" variant="standard" name="Contact" required fullWidth type="tel" inputProps={{ pattern: "[0-9]{4}-[0-9]{7}" }} placeholder="0301-XXXXXXX" /></div>
        //         <div className="form__btn"><Button variant="contained" color="success" type="submit" className="btn">Submit</Button></div>
        //     </form>
        // </div>
        // </div>


        <div className='signin_container'>
            <div className='container1'>
                <div className="container1__img">
                </div>
                <div className='container1__form'>
                    <div className='new__acount'>
                        <p className='new_account_signin'>Create an Account</p>
                    </div>
                    <div className='field1'>
                        <div id='btn1'>
                            <form onSubmit={btnclick1}>
                                <div>
                                    <div className="text"><TextField onChange={e => SetFname(e.target.value)} label="First Name" variant="standard" required fullWidth inputProps={{ pattern: "[a-z-A-Z]{3,8}" }} placeholder="Contains 3 to 8 letters" /></div>
                                    <div className="text"><TextField onChange={e => SetLname(e.target.value)} label="Last Name" variant="standard" name="lname" required fullWidth inputProps={{ pattern: "[a-z-A-Z]{3,8}" }} placeholder="Contains 3 to 8 letters" /></div>
                                    <RadioGroup name="radio-buttons-group" defaultValue="female" row aria-label="gender" className='text'>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup></div>
                                    <label className='btn1-label'>Already have one ? <span className='btn1-span' onClick={()=>history.push('/')}>Sign in</span></label>
                                <div className='field1_button'><button type="submit">Next</button></div>
                            </form>
                        </div>
                        <div id='btn2' style={{ display: 'none' }}>
                            <form onSubmit={btnclick2}>
                                <div className="text"><TextField onChange={e => SetEmail(e.target.value)} label="Email" variant="standard" required fullWidth type="email" inputProps={{ pattern: ".+@gmail.com" }} placeholder="xyz5@gmail.com" /></div>
                                <div className="text"><TextField type="password" onChange={e => SetPassword(e.target.value)} label="Password" variant="standard" required fullWidth /></div>
                                <div className="text"><TextField onChange={e => SetCnic(e.target.value)} label="CNIC" variant="standard" required fullWidth placeholder="XXXXX-XXXXXXX-X" inputProps={{ pattern: "[0-9]{5}-[0-9]{7}-[0-9]{1}" }} /></div>
                                <label className='btn1-label'>Already have one ? <span className='btn1-span' onClick={()=>history.push('/')}>Sign in</span></label>
                                <div className='field1_button'><button type="submit">Next</button></div>
                            </form>
                        </div>

                        <div id='btn3'style={{display:'none'}} >
                            <form onSubmit={submitform}>
                                <div className="text"><TextField onChange={e => SetContact(e.target.value)} label="Contact" variant="standard" name="Contact" required fullWidth type="tel" inputProps={{ pattern: "[0-9]{4}-[0-9]{7}" }} placeholder="0301-XXXXXXX" /></div>
                                <label className='btn1-label'>Already have one ? <span className='btn1-span' onClick={()=>history.push('/')}>Sign in</span></label>
                                <div className="field1_button"><button type="submit" className="btn">Submit</button></div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SignInform
