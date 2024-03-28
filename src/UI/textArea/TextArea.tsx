import React from 'react';
import { motion } from 'framer-motion';
import styles from './TextArea.module.scss';

interface Props {
  label: string;
  placeholder: string | undefined;
  value: string | number;
  defaultValue: string | number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  error: boolean;
  errorText: string;
}

const TextArea = (props: Partial<Props>) => {
  return (
    <>
      {' '}
      <motion.div className={styles.container}>
        <motion.label
          className={props.error ? styles.labelError : styles.label}
        >
          {props.label}
        </motion.label>
        <motion.textarea
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={props.error ? styles.textAreaError : styles.textArea}
        ></motion.textarea>
        <motion.p className={styles.errorText}>{props.errorText}</motion.p>
      </motion.div>
    </>
  );
};

export default TextArea;
