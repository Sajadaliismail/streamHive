
import { useDispatch } from 'react-redux';
import { setError, clearError } from '../features/userAuthSlice';
import { signup } from '../features/userAsyncThunks'; 
import { ispasswordmatch, isPasswordValid } from '../utils/validation'; 

export const useSignup = () => {
  const dispatch = useDispatch();

  const signupSubmit =async (name, email, password, confirmPassword) => {
    if (name.trim() === '') {
      dispatch(setError('Please enter name correctly'));
      return;
    }
    if (!ispasswordmatch(confirmPassword,password)) {
        dispatch(setError('Passwords do not match'));
        return;
      }
    
    if (!isPasswordValid(password)) {
      dispatch(setError('Passwords should contain numbers and letters'));
      return;
    }
    
    dispatch(clearError());
    try {
        const resultAction = await dispatch(signup({ name, email, password }));
        if (signup.fulfilled.match(resultAction)) {
          return resultAction.payload.success;
        } else {
          return false;
        }
      } catch (err) {
        console.error('Failed to signup:', err);
        return false;
      }
  };
  return { signupSubmit };
};
