import { ReactNode } from 'react';
import styles from './Dialog.module.css'
import { DialogLoginStore } from '../../store/dialogStore';

type DialogProps = {
  children: ReactNode;
}

export const Dialog = ({ children }: DialogProps) => {
  const { showDialog } = DialogLoginStore();

  if(showDialog){
    return (
      <dialog className={styles.dialog}>
        {children}
      </dialog>
    );
  }
};

