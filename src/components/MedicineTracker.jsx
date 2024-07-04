import { useReducer, useState, useEffect, useRef } from 'react';
import './MedicineTracker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const doseOptions = ['250mg', '500mg', '750mg', '1000mg'];
const scheduleOptions = ['Every 6 hours', 'Every 8 hours', 'Every 24 hours'];

const initialState = {
  medicines: [],
  form: {
    name: '',
    dose: '',
    schedule: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEDICINE':
      if (!state.form.name || !state.form.dose || !state.form.schedule) {
        toast.error('Please fill in all fields');
        return state;
      }
      toast.success('Medicine added successfully');
      return {
        ...state,
        medicines: [
          ...state.medicines,
          { ...state.form, lastTaken: null },
        ],
        form: { name: '', dose: '', schedule: '' },
      };
    case 'SET_FORM_FIELD':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case 'UPDATE_LAST_TAKEN':
      return {
        ...state,
        medicines: state.medicines.map((medicine, index) =>
          index === action.index
            ? { ...medicine, lastTaken: new Date().toLocaleString() }
            : medicine
        ),
      };
    case 'DELETE_MEDICINE':
      toast.success('Medicine deleted successfully');
      return {
        ...state,
        medicines: state.medicines.filter((_, index) => index !== action.index),
      };
    case 'EDIT_MEDICINE':
      return {
        ...state,
        form: { ...state.medicines[action.index] },
        editIndex: action.index,
      };
    case 'UPDATE_MEDICINE':
      toast.success('Medicine updated successfully');
      return {
        ...state,
        medicines: state.medicines.map((medicine, index) =>
          index === state.editIndex
            ? { ...state.form }
            : medicine
        ),
        form: { name: '', dose: '', schedule: '',},
        editIndex: null,
      };
    default:
      return state;
  }
};


const MedicineTracker = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const audioRef = useRef(new Audio('notification-sound.wav'));
  const intervalRefs = useRef([]);

const handleChange = (e) => {
    dispatch({
      type: 'SET_FORM_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      dispatch({ type: 'UPDATE_MEDICINE' });
      setIsEditing(false);
    } else {
      dispatch({ type: 'ADD_MEDICINE' });
    }
  };

  const handleEdit = (index) => {
    dispatch({ type: 'EDIT_MEDICINE', index });
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    clearInterval(intervalRefs.current[index]);
    intervalRefs.current.splice(index, 1);
    dispatch({ type: 'DELETE_MEDICINE', index });
  };

  const handleTakeMedicine = (index) => {
    dispatch({ type: 'UPDATE_LAST_TAKEN', index });
    toast.info('Medicine taken');
  };


  const setNotificationInterval = (medicine, index) => {
    let interval;
    switch (medicine.schedule) {
        case 'Every 6 hours':
            interval = 6 * 60 * 60 * 1000;
            break;
        case 'Every 8 hours':
            interval = 8 * 60 * 60 * 1000;
            break;
        case 'Every 12 hours':
            interval = 12 * 60 * 60 * 1000;
            break;
        default:
            interval = 24 * 60 * 60 * 1000; // Default to 24 hours if unknown
    }

    console.log(`Setting interval for ${medicine.name}: ${interval}ms`);

    intervalRefs.current[index] = setInterval(() => {
        const lastTakenDate = new Date(medicine.lastTaken || 0);
        const now = new Date();

        console.log(`Checking ${medicine.name}: now - lastTakenDate = ${now - lastTakenDate}, interval = ${interval}`);

            if (now - lastTakenDate >= interval ) {
            toast.info(`Time to take your medicine: ${medicine.name}`);
              audioRef.current.play();
              medicine.lastTaken = now.getTime();
             setNotificationInterval(medicine, index);
            }
    }, interval - (new Date().getTime() - medicine.lastTaken));
};

  useEffect(() => {
    // Clear all intervals on unmount
    return () => {
        intervalRefs.current.forEach(interval => {
            if (interval) {
                clearInterval(interval);
            }
        });
    };
}, []);

useEffect(() => {
  state.medicines.forEach((medicine, index) => {
      if (intervalRefs.current[index]) {
          clearInterval(intervalRefs.current[index]);
      }
      setNotificationInterval(medicine, index);
  });

  // Optional: Clean up intervals if medicines are removed
  return () => {
      intervalRefs.current.forEach(interval => {
          if (interval) {
              clearInterval(interval);
          }
      });
  };
}, [state.medicines,]);

  return (
    <div className="medicine-tracker">
      <h1>Medicine Tracker</h1>
      <div className="input-group">
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          value={state.form.name}
          onChange={handleChange}
        />
       <select
          name="dose"
          value={state.form.dose}
          onChange={handleChange}
        >
          <option value="" disabled>Select Dose</option>
          {doseOptions.map((dose, index) => (
            <option key={index} value={dose}>{dose}</option>
          ))}
        </select>
         <select
          name="schedule"
          value={state.form.schedule}
          onChange={handleChange}
        >
          <option value="" disabled>Select Schedule</option>
          {scheduleOptions.map((schedule, index) => (
            <option key={index} value={schedule}>{schedule}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>
          {isEditing ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </div>
      <ul>
        {state.medicines.map((medicine, index) => (
          <li key={index}>
            <span>{medicine.name}</span>
            <span>{medicine.dose}</span>
            <span>{medicine.schedule}</span>
            <span>Last Taken: {medicine.lastTaken || 'Never'}</span>
            <button onClick={() => handleTakeMedicine(index)}>Take Medicine</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default MedicineTracker;