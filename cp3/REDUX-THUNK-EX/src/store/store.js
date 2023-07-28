import { applyMiddleware, combineReducers, createStore } from "redux";
import { countReducer } from "../reducers/count";
import logger from "redux-logger";
//리듀서? Action과 마지막 Store의 상태를 기준으로 새로운 상태를 만들어주는 것
const rootReducer = combineReducers({ //여러개의 리듀서를 합치는 메소드
    count : countReducer,
    /*if add reducer
    place here example code
    date: dateReducer
    */

})

const store = createStore(rootReducer,applyMiddleware(logger)); //createStore 메소드를 통하여 store가 생성  즉 글로벌 데이터가 생성 매개변수로 위에서 선언한 루트리듀서 넣기

export default store;