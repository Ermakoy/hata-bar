import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Box, Modal, Input } from 'rendition';

const [markKey, ermakoyKey] = [
  process.env.GATSBY_MARK_KEY,
  process.env.GATSBY_ERMAKOY_KEY,
];

export function InputModal({ setModalState, handleAddDay, modalState }) {
  const [inputVal, setInputVal] = useState('');

  return (
    <Modal
      title={`Выпили пива ${format(modalState.day, 'd MMMM eeee', {
        locale: ru,
      })} ?`}
      cancel={() => {
        // cancelAction();
        setModalState({ show: false });
      }}
      done={x => {
        const names = inputVal
          .split(' ')
          .filter(el => [markKey, ermakoyKey].includes(el))
          .map(key => ({ [markKey]: 'Mark', [ermakoyKey]: 'Ermakoy' }[key]));
        if (names.length) {
          handleAddDay({ date: modalState.day, name: names });
        }
        setModalState({ show: false });
      }}
    >
      <Box>
        <Input
          type='password'
          placeholder='Введите свой уникальный ключ'
          onChange={e => setInputVal(e.target.value)}
        />
      </Box>
    </Modal>
  );
}
