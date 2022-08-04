import React, { useState } from "react";
import { PASSWORD, TEXT } from "../../lib/types";
import { MainInput, PasswordInput } from "./styled";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean | string;
  label?: string;
  errorText?: string;
}

const Input: React.FC<InputProps> = ({
  error,
  label,
  value,
  onChange,
  onFocus,
  disabled,
  required,
  type,
  onBlur,
  placeholder,
  maxLength,
  className,
  errorText,
  id,
  name,
}) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const toggleVisibility = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <div className="w-full mb-5">
      <p className="text-sm font-medium pb-1 text-text-color-a">{label}</p>
      {type === PASSWORD ? (
        <PasswordInput
          error={error}
          className="w-full h-11 bg-white border border-text-color-d flex flex-row items-center px-2 md:px-4 rounded-md"
        >
          <input
            type={hidden ? PASSWORD : TEXT}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            onBlur={onBlur}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`outline-none focus:outline-none bg-transparent h-full w-11/12 placeholder-text-color-d text-text-color-d md:text-base text-sm password-input ${className}`}
          />
          <span className="eye">
            {!hidden ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleVisibility}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={toggleVisibility}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </span>
        </PasswordInput>
      ) : (
        <MainInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          onBlur={onBlur}
          error={error}
          placeholder={placeholder}
          type={type ? type : TEXT}
          maxLength={maxLength}
          id={id}
          name={name}
          className={`w-full rounded-lg px-2 md:px-4 h-11  outline-none text-text-color-d md:text-base text-sm placeholder-text-color-d ${className}`}
        />
      )}

      {error && (
        <p className="text-secondary-error text-xs font-semibold pt-1 pl-1">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
