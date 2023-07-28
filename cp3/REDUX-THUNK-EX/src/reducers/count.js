import { ADD_COUNT, DELETE_COUNT } from "../actions/counter"

export const initialState = {
    count: 0,
}

//순수함수
//외부값에 영향을 받는 것이 아닌 매개변수로만 데이터를 다룬다
//매개변수로 관리될 스테이트를 가져오고 어떤 액션 즉 이벤트가 발생했는지 가져오고 변경된 배열을 리턴해준다 ... 스프레드 연산자

export const countReducer = (state=initialState, action) =>{
    switch(action.type){
        case ADD_COUNT:
            return{
                ...state,
                count : state.count+1
            }
        case DELETE_COUNT:
            return{
                ...state,
                count : state.count-1
            }
    }
    return{
        ...state
    }
}