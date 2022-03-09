import React, { useReducer, } from 'react';


type InitialState = {
  currentOperand:number,
  previousOperand:number,
  operation:string
}

type ActionType = | {type: 'ADD_DIGIT', data: number}
| {type: 'DELETE_DIGIT', data: number}
| {type: 'CHOOSE_OPERATION', data: string}
| {type: 'EVALUATE', data: number}

| {type: 'CLEAR'}





function reducer (state:InitialState, action:ActionType):InitialState {

  switch(action.type) {
    case 'ADD_DIGIT':
      return {
        ...state,
      }
    default: return state
  }
}

const initialState = {
  currentOperand: 0,
  previousOperand: 0,
  operation: ''

}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"></div>
        <div className="current-operand"></div>
          </div>

          <button className="span-two">AC</button>
          <button>DEL</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
          <button>.</button>
          <button>0</button>
          <button className='span-two'>=</button>










    </div>
  );
}

export default App;
