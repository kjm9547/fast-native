export const ADD_COUNT = 'ADD_COUNT';
export const DELETE_COUNT = 'DELETE_COUNT';

export const addCount = () =>{
    return{
        type:ADD_COUNT
    }
}

export const deleteCount = () =>{
    return{
        type:DELETE_COUNT,
    }
}

//액션을 정의하고 개발자가 정의한 액션을 리턴?? 스트링형태로
