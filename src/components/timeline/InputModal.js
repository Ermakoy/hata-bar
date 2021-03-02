import {
  format,
} from 'date-fns';
import {
  ru,
} from 'date-fns/locale';
import React, {
  useState,
} from 'react';
import {
  Box, Modal, Input,
} from 'rendition';

export const [markKey, ermakoyKey] = [
  process.env.GATSBY_MARK_KEY,
  process.env.GATSBY_ERMAKOY_KEY,
].map((element) => element.toLowerCase());

export function InputModal ({setModalState, handleAddDay, modalState}) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Modal
      cancel={() => {
        // cancelAction();
        setModalState({show: false});
      }}
      done={() => {
        const names = inputValue
          .split(' ')
          .map((element) => element.toLowerCase())
          .filter((element) => [markKey, ermakoyKey].includes(element))
          .map((key) => ({[ermakoyKey]: 'Ermakoy', [markKey]: 'Mark'}[key]));
        if (names.length) {
          handleAddDay({date: modalState.day,
            name: names});
        }
        setModalState({show: false});
      }}
      title={`Выпили пива ${format(modalState.day, 'd MMMM eeee', {
        locale: ru,
      })} ?`}
    >
      <Box>
        <Input
          onChange={(event) => setInputValue(event.target.value)}
          placeholder='Введите свой уникальный ключ'
          type='password'
        />
      </Box>
    </Modal>
  );
}
