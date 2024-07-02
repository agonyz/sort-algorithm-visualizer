import Toast from 'react-bootstrap/Toast';
import React from 'react';

interface SortSuccessToastProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const SortSuccessToast: React.FC<SortSuccessToastProps> = ({
  show,
  setShow,
}) => {
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      style={{ position: 'fixed', bottom: '20px', right: '20px' }}
    >
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
        <small>Just now</small>
      </Toast.Header>
      <Toast.Body>Sorting completed successfully!</Toast.Body>
    </Toast>
  );
};
