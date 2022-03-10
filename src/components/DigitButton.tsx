import React, { Dispatch } from 'react'
import { ActionType } from '../App'

type DigitButtonProps = {
  dispatch: Dispatch<ActionType>,
  digit:string
}
export const DigitButton = ({dispatch, digit}: DigitButtonProps) => {

  return (
    <button onClick={() => dispatch({type:'ADD_DIGIT', payload:{digit}})}>{digit}</button>
  )
}
