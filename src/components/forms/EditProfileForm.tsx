import React from 'react';
import { Alert, Vibration, View } from 'react-native';
import CellPhoneSvg from '../../icons/cellphone';
import ProfileSvg from '../../icons/profile';
import Form, { IFormInput } from '../elements/Form';
import ImagePicker from '../elements/ImagePicker';
import EmployeeSvg from '../../icons/employee';
import LocationSvg from '../../icons/location';
import { Asset } from 'react-native-image-picker';
import { isEmpty } from '../../utils/FormUtils';
import { Profile } from '../../types/user';

export interface EditProfileFormState{
    firstName?: string;
    lastName?: string;
    address?: string;
    mobile?: string;
    bio?: string;
    profile_photo?: Asset;
}

export interface EditProfileFormProps{
    onSubmit?: (arg?: EditProfileFormState)=> any;
    user?: Profile;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
    onSubmit, user
})=>{

        // State
        const [state, setState] = React.useState<EditProfileFormState>();
        const [confirmPassword, setConfirmPassword] = React.useState<string>('');
        const [inputsValid, setInputsValid] = React.useState<boolean>(false);

        // Value collectors
        const photoValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                profile_photo: value
            }))
        }
        const firstNameValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                firstName: value
            }))
        }
    
        const lastNameValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                lastName: value
            }))
        }
        const addressValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                address: value
            }))
        }
        const mobileValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                mobile: value
            }))
        }
        const bioValueCollector = (value: any) =>{
            setState((prevState)=>({
                ...prevState,
                bio: value
            }))
        }

        // Input validator
        const validateInputs = (obj: any)=>{
            if (!obj) {
                Vibration.vibrate();
                Alert.alert(
                    'Missing Field',
                    `Please fill in all the fields`,
                    [
                        { text: 'OK' }
                    ]
                );
                return false;
            }
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                
                    if (isEmpty(element)) {
                        Vibration.vibrate();
                        Alert.alert(
                            'Missing Field',
                            `Please fill in all the fields`,
                            [
                                { text: 'OK' }
                            ]
                        );
                        return false;
                    }
                    
                }
            }

            return true;
        }

        // Handlers
        const handleSubmit = () =>{
            if (validateInputs(state)) {
                onSubmit && onSubmit(state)
            }
        }

    const inputs: IFormInput[] = [
        { 
            inputComponent: <ImagePicker valueCollector={photoValueCollector}/>,
            useCustombottomLabelComponent: true,
        },
        { 
            placeholder: "First Name", 
            icon: <ProfileSvg/>,
            useDefaultAdornment: true,
            valueCollector: firstNameValueCollector,
            value: state?.firstName
        },
        { 
            placeholder: "Last Name", 
            icon: <ProfileSvg/>,
            useDefaultAdornment: true,
            valueCollector: lastNameValueCollector,
            value: state?.lastName
        },
        { 
            placeholder: "Address", 
            icon: <LocationSvg/>,
            useDefaultAdornment: true,
            valueCollector: addressValueCollector,
            value: state?.address,
        },
        { 
            placeholder: "Phone Number", 
            valueCollector: mobileValueCollector,
            icon: <CellPhoneSvg/>,
            useDefaultAdornment: true,
            value: state?.mobile
        },
        // { 
        //     placeholder: "Bio", 
        //     icon: <EmployeeSvg/>,
        //     useDefaultAdornment: true,
        //     valueCollector: bioValueCollector
        // },
    ];

    // Effect for editing profile
    React.useEffect(()=>{
        if (user) {
            setState({
                firstName: user.first_name,
                lastName: user.last_name,
                address: user.address,
                mobile: user.mobile,
            })
        }
    }, [user]);

    return(
        <Form 
            inputs={inputs}
            buttonStyle={{
                marginTop: 10
            }}
            buttonText={'SAVE CHANGES'}
            onSubmit={handleSubmit}
        />
    )
}


export default EditProfileForm;