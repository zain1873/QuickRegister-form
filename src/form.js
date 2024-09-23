import React from 'react';
import './form.css';
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    watch,
    reset, // Add reset to destructure
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onSubmit = async (data) => {
    await delay(3); // Simulate a 3-second delay
    console.log(data);
    reset();
  };

  const passwordValue = watch("password");

  return (
    <div>
      {isSubmitting && <div>...Loading</div>} 
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign in</h3>

          <input
            placeholder='Username'
            {...register("username", {
              required: { value: true, message: "Username field is required" },
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 20, message: "Maximum length is 20" }
            })}
          />
          {errors.username && <p className='red'>{errors.username.message}</p>}
          <br />

          <input
            placeholder='Password'
            type="password"
            {...register("password", {
              required: { value: true, message: "Password field is required" },
              minLength: { value: 8, message: "Min length of password is 8" },
              maxLength: { value: 20, message: "Max length of password is 20" }
            })}
          />
          {errors.password && <p className='red'>{errors.password.message}</p>}
          <br />

          <input
            placeholder='Confirm Password'
            type="password"
            {...register("confirmPassword", {
              required: { value: true, message: "Confirm password is required" },
              validate: (value) =>
                value === passwordValue || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <p className='red'>{errors.confirmPassword.message}</p>
          )}
          <br />

          <input
            type="tel"
            placeholder='Mobile Number'
            {...register("mobileNumber", {
              required: { value: true, message: "Mobile number is required" },
              pattern: {
                value: /^[0-9]{11}$/, // Regex for exactly 11 digits
                message: "Please enter a valid 11-digit mobile number"
              }
            })}
          />
          {errors.mobileNumber && <p className='red'>{errors.mobileNumber.message}</p>}

          <button disabled={isSubmitting} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
