import React from 'react';
import { usePrintModal } from './usePrintModal';
import styles from './PrintModal.module.scss';
import TextArea from '../../UI/textArea/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faXmark } from '@fortawesome/free-solid-svg-icons';

const PrintModal = () => {
  const { handleCloseModal } = usePrintModal();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <button
            className={styles.closeForm}
            onClick={() => handleCloseModal()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button className={styles.printbuton}>
            <FontAwesomeIcon icon={faPrint} />
            <span>Print</span>
          </button>
          <div className={styles.textAreaContainer}>
            <div className={styles.textArea}>
              <TextArea placeholder="Contacts" label="Contacts" />
            </div>

            <div className={styles.textArea}>
              <TextArea placeholder="Comment" label="Comment" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintModal;
