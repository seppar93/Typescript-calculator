import React, { useReducer } from 'react';
import { DigitButton } from './components/DigitButton';
import OperationButton from './components/OperationButton';

type InitialState = {
  currentOperand: string;
  previousOperand: string;
  operation: string;
};

export type ActionType =
  | { type: 'ADD_DIGIT'; payload: string }
  | { type: 'DELETE_DIGIT'; payload: string }
  | { type: 'CHOOSE_OPERATION'; payload: string }
  | { type: 'EVALUATE'; payload: string }
  | { type: 'CLEAR' };

function reducer(state: InitialState, action: ActionType): InitialState {
  switch (action.type) {
    case 'ADD_DIGIT':
      return {
        ...state,
        currentOperand: `${action.payload || ''}${action.payload}`,
      };
    default:
      return state;
  }
}

const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: '',
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'> {state.currentOperand}</div>
        <div className='current-operand'>{state.previousOperand}</div>
      </div>

      <button className='span-two'>AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='1'/>
      <DigitButton dispatch={dispatch} digit='2'/>
      <DigitButton dispatch={dispatch} digit='3'/>
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='4'/>
      <DigitButton dispatch={dispatch} digit='5'/>
      <DigitButton dispatch={dispatch} digit='6'/>
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='7'/>
      <DigitButton dispatch={dispatch} digit='8'/>
      <DigitButton dispatch={dispatch} digit='9'/>
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />

      <button className='span-two'>=</button>
    </div>
  );
}

export default App;
