import React, { Dispatch } from 'react';
import { ActionType } from '../App';

type OperationButtonProps = {
  dispatch: Dispatch<ActionType>;
  operation: string;
};

const OperationButton = ({ dispatch, operation }: OperationButtonProps) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: 'CHOOSE_OPERATION', payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
