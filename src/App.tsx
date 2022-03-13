import React, { useReducer } from 'react';
import { DigitButton } from './components/DigitButton';
import OperationButton from './components/OperationButton';

import './index.css';

type InitialState = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite:boolean;
};

export type ActionType =
  | { type: 'ADD_DIGIT'; payload: { digit: string } }
  | { type: 'DELETE_DIGIT'; payload: { digit: string } }
  | { type: 'CHOOSE_OPERATION'; payload: { operation: string } }
  | { type: 'EVALUATE'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'EVALUATE' };


function reducer(state: InitialState, action: ActionType): InitialState {
  switch (action.type) {
      case 'ADD_DIGIT':
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: action.payload.digit,
            overwrite: false,
          }
        }
        if (action.payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if(state.currentOperand != null) {

          if (action.payload.digit === "." && state.currentOperand.includes(".")) {
            return state
          }
        }
  
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${action.payload.digit}`,
        }
      case 'CHOOSE_OPERATION':
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
  
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: action.payload.operation,
          }
        }
  
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: action.payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
  
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: action.payload.operation,
          currentOperand: null,
        }
      case 'CLEAR':
        return state
      case 'DELETE_DIGIT':

        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          }
        }
        if (state.currentOperand == null) return state
        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null }
        }
  
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        }
      case 'EVALUATE':
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state
        }
  
        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state),
        }
    }
}

function evaluate({currentOperand, previousOperand, operation}: InitialState): string {
  let computation = 0;
  if(currentOperand !== null && previousOperand !== null) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if(isNaN(prev) || isNaN(current)) return ''
    switch(operation) {
      case "+": 
      computation = prev+ current
      break
      case "-":
        computation = prev- current
        break

      case "*": 
        computation = prev * current
        break
      case "/": 
      computation = prev /current
      break
    }
  }
  return computation.toString()

}

const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false
};



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('currentOperand', state.currentOperand);
  console.log('previousOperand', state.previousOperand);

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'> {state.previousOperand}</div>
        <div className='current-operand'>{state.currentOperand}</div>
      </div>

      <button className='span-two' onClick={() => dispatch({ type: 'CLEAR' })}>
        AC
      </button>
      <button>DEL</button>
      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='1' />
      <DigitButton dispatch={dispatch} digit='2' />
      <DigitButton dispatch={dispatch} digit='3' />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='4' />
      <DigitButton dispatch={dispatch} digit='5' />
      <DigitButton dispatch={dispatch} digit='6' />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton dispatch={dispatch} digit='7' />
      <DigitButton dispatch={dispatch} digit='8' />
      <DigitButton dispatch={dispatch} digit='9' />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />

      <button className='span-two'>=</button>
    </div>
  );
}

export default App;
