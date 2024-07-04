import PropTypes from 'prop-types';
import { useReducer, } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';

const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  errorMessage: '',
  successMessage: '',
  bday: '',
  age: '',
  occupation: '',
  condition: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'TOGGLE_SHOW_CONFIRM_PASSWORD':
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.message, successMessage: '' };
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, successMessage: action.message, errorMessage: '' };
    case 'CLEAR_FORM':
      return initialState; // Reset all fields to initial state
    default:
      return state;
  }
};

const UserProfile = ({ onCancel }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleUpdate = () => {
    // Check if all required fields are filled
    if (!state.firstName || !state.lastName || !state.bday || !state.age || !state.occupation || !state.condition || !state.email || !state.password || !state.confirmPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
     // Check if first name and last name are at least 2 characters long
     if (state.firstName.length < 2 || state.lastName.length < 2) {
      toast.error('First name and Last name must be at least 2 characters long.');
      return;
    }
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(state.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    // Check if password is at least 8 characters long and matches regex pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(state.password)) {
      dispatch({ type: 'SET_ERROR_MESSAGE', message: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.' });
      return;
    }
  
    // Check if password and confirm password match
    if (state.password !== state.confirmPassword) {
      dispatch({ type: 'SET_ERROR_MESSAGE', message: 'Password and Confirm Password do not match, Please try again!' });
      return;
    }
  
    // If all validations pass, update profile and save data
    localStorage.setItem('userData', JSON.stringify(state));
    dispatch({ type: 'SET_SUCCESS_MESSAGE', message: 'Profile updated successfully!' });
  };
  

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
    if (field === 'bday') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      dispatch({ type: 'SET_FIELD', field: 'age', value: age.toString() });
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'CLEAR_FORM' });
    onCancel('');
  };

  return (
    <div className="second-form">
      <ToastContainer />
      <div className="second-form-body">
        <div className="second-username">
          <label className="second-form__label" htmlFor="firstName">First Name </label>
          <input
            className="second-form__input"
            type="text"
            id="firstName"
            value={state.firstName}
            onChange={(event) => handleChange('firstName', event.target.value)}
          />
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="middleName">Middle Name: (Optional) </label>
          <input
            className="second-form__input"
            type="text"
            id="middleName"
            value={state.middleName}
            onChange={(event) => handleChange('middleName', event.target.value)}
          />
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="lastName">Last Name </label>
          <input
            className="second-form__input"
            type="text"
            id="lastName"
            value={state.lastName}
            onChange={(event) => handleChange('lastName', event.target.value)}
          />
          </div>
        <div className="second-username">
          <label className='second-form__label' htmlFor="Bday">Date Of Birth</label>
          <input
            className="second-form__input"
            type="date"
            id="date"
            value={state.bday}
            onChange={(event) => handleChange('bday', event.target.value)}
          />
        <div className="second-username">
          <label className="second-form__label" htmlFor="age">Age </label>
          <input
            className="second-form__input"
            type="number" 
            id="age"
            value={state.age} 
            onChange={(event) => handleChange('age', event.target.value)} 
            min="0"
            max="120"
          />
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="occupation">Occupation </label>
          <input
            className="second-form__input"
            type="text"
            id="occupation"
            value={state.occupation}
            onChange={(event) => handleChange('occupation', event.target.value)}
          />
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="condition">Condition </label>
          <input
            className="second-form__input"
            type="condition"
            id="condition"
            value={state.condition}
            onChange={(event) => handleChange('condition', event.target.value)}
          />
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="email">Email </label>
          <input
            className="second-form__input"
            type="email"
            id="email"
            value={state.email}
            onChange={(event) => handleChange('email', event.target.value)}
          />
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="password">Password </label>
          <input
            className="second-form__input"
            type={state.showPassword ? 'text' : 'password'}
            id="password"
            value={state.password}
            onChange={(event) => handleChange('password', event.target.value)}
          />
          <span className="show-password-icon" onClick={() => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}>
            <i className={state.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
          </span>
        </div>
        <div className="second-username">
          <label className="second-form__label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="second-form__input"
            type={state.showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={state.confirmPassword}
            onChange={(event) => handleChange('confirmPassword', event.target.value)}
          />
          <span className="show-password-icon" onClick={() => dispatch({ type: 'TOGGLE_SHOW_CONFIRM_PASSWORD' })}>
            <i className={state.showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
          </span>
        </div>
        {state.errorMessage && <p className="error-message">{state.errorMessage}</p>}
        {state.successMessage && <p className="success-message">{state.successMessage}</p>}
        <button className="btn" onClick={handleUpdate}>Update</button>
        <button className="btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
export default UserProfile;

