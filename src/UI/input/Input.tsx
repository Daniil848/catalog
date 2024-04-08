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
  name: string;
}

const Input = (props: Partial<Props>) => {
  return (
    <>
      <motion.div className={styles.container}>
        <motion.label className={styles.label}>{props.label}</motion.label>
        <motion.input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={styles.input}
          min={0}
          name={props.name}
        ></motion.input>
      </motion.div>
    </>
  );
};

export default Input;
