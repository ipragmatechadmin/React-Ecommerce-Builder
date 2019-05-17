import { all, fork } from 'redux-saga/effects'
import localeSaga from './localeSaga'

export default function* root() {
    yield all([
      localeSaga()
    ])
  }
