import { useReducer } from 'react';
import './RegistrationForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    default:
      return state;
  }
};

function RegistrationForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();

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
    
    // Validate email format first
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

    if (!state.firstName ||!state.lastName ||!state.email ||!state.password ||!state.confirmPassword) {
      dispatch({ type: 'SET_ERROR_MESSAGE', message: 'All fields are required, Please try again!' });
    } else if (state.password.length < 8) {
      dispatch({ type: 'SET_ERROR_MESSAGE', message: 'Password must be at least 8 characters long, Please try again!' });
    }
    
    // If all validations pass
    dispatch({ type: 'SET_SUCCESS_MESSAGE', message: 'Form submitted successfully!' });
    
    // Save data to local storage
    localStorage.setItem('userData', JSON.stringify(state));
    console.log('Data saved to local storage!');
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


  return (
    <div className="form">
      <ToastContainer />
      <div className="form-body">
        <div className="username">
          <label className="form__label" htmlFor="firstName">First Name </label>
          <input
            className="form__input"
            type="text"
            id="firstName"
            value={state.firstName}
            onChange={(event) => handleChange('firstName', event.target.value)}
          />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="middleName">Middle Name: (Optional) </label>
          <input
            className="form__input"
            type="text"
            id="middleName"
            value={state.middleName}
            onChange={(event) => handleChange('middleName', event.target.value)}
          />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="lastName">Last Name </label>
          <input
            className="form__input"
            type="text"
            id="lastName"
            value={state.lastName}
            onChange={(event) => handleChange('lastName', event.target.value)}
          />
        </div>
        <div className="username">
            <label className='form__label' htmlFor="Bday">Date Of Birth</label>
            <input 
            className="form__input"
            type="date"
            id="date"
            value={state.bday}
            onChange={(event) => handleChange('bday', event.target.value)}
        />
        <div className="username">
          <label className="form__label" htmlFor="age">Age </label>
          <input
            className="form__input"
            type="number"
            id="age"
            value={state.age}
            onChange={(event) => handleChange('age', event.target.value)}
            min="0"
            max="120"
          />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="occupation">Occupation </label>
          <input
            className="form__input"
            type="text"
            id="occupation"
            value={state.occupation}
            onChange={(event) => handleChange('occupation', event.target.value)}
          />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="condition">Condition </label>
          <input
            className="form__input"
            type="condition"
            id="condition"
            value={state.condition}
            onChange={(event) => handleChange('condition', event.target.value)}
          />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="email">Email </label>
          <input
            className="form__input"
            type="email"
            id="email"
            value={state.email}
            onChange={(event) => handleChange('email', event.target.value)}
          />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="password">Password </label>
          <input
            className="form__input"
            type={state.showPassword ? 'text' : 'password'}
            id="password"
            value={state.password}
            onChange={(event) => handleChange('password', event.target.value)}
          />
          <span className="show-password-icon" onClick={() => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}>
           <i className={state.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
          </span>
        </div>
        <div className="username">
          <label className="form__label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form__input"
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
        <button className="btn" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  </div>
  );
}

export default RegistrationForm;