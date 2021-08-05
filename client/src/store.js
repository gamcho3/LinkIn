import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState(); //애플리케이션의 현재 상태 반환(리듀서과 마지막으로 반환한 값과 동일)

store.subscribe(() => {
  //store값이 변경될때마다 호출
  let previousState = currentState; //현재값 백업
  currentState = store.getState(); //바뀐후 값으로 재변경
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
