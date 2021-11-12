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

function Step1() {
    const [Fname, SetFname] = React.useState('');
    const [Lname, SetLname] = React.useState('');
    return (
        <div>
            <div className="text"><TextField onChange={e => SetFname(e.target.value)} label="First Name" variant="standard" required fullWidth inputProps={{ pattern: "[a-z-A-Z]{3,8}" }} placeholder="Contains 3 to 8 letters" /></div>
            <div className="text"><TextField onChange={e => SetLname(e.target.value)} label="Last Name" variant="standard" name="lname" required fullWidth inputProps={{ pattern: "[a-z-A-Z]{3,8}" }} placeholder="Contains 3 to 8 letters" /></div>
            {/* <div className="text"><FormLabel component="legend">Gender</FormLabel>
                <RadioGroup name="radio-buttons-group" defaultValue="female" row aria-label="gender">
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup></div> */}
                <div className='field_button'><button type="submit">Next</button></div>
        </div>
    )
}

export default Step1
