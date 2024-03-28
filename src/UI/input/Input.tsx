import React from 'react';
import { motion } from 'framer-motion';
import styles from './Input.module.scss';

interface Props {
  label: string;
  type: string;
  placeholder: string | undefined;
  value: string | number;
  defaultValue: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  error: boolean;
  errorText: string;
}

const Input = (props: Partial<Props>) => {
  return (
    <>
      {' '}
      <motion.div className={styles.container}>
        <motion.label
          className={props.error ? styles.labelError : styles.label}
        >
          {props.label}
        </motion.label>
        <motion.input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={props.error ? styles.inputError : styles.input}
          min={0}
        ></motion.input>
        <motion.p className={styles.errorText}>{props.errorText}</motion.p>
      </motion.div>
    </>
  );
};

export default Input;
