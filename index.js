const { default: axios } = require("axios")
const { combineReducers, createStore, applyMiddleware } = require("redux")
const { default: logger } = require("redux-logger")
const { default: thunk } = require("redux-thunk")



// variables 

const increment = 'increment'
const decrement = 'decrement'
const requestApi = 'requestApi'
const successApi = 'successApi'
const failedApi = 'failedApi'


// action creator 

const incrementAction = (amount) => {
  return {
    type: increment ,
    payload : amount 
  }
}
const decrementAction = (amount) => {
  return {
    type: decrement ,
    payload : amount 
  }
}

//fetch actions

const requestAction = () => {
  return {
    type: requestApi
  }
}
const successAction = (data) => {
  return {
    type: successApi ,
    payload: data
  }
}
const failedAction = (error) => {
  return {
    type: failedApi , 
    payload : error
  }
}
// async action

const fetchData = () =>  {
  return (dispatch) => {
  dispatch(requestAction())
  axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then((data) => {
    dispatch(successAction(data.data))
  })
  .catch( (err) => {
    dispatch(failedAction(err.message))
  })
}}

// reducers 

const initialCounterState = {
  counterState : 0
}

const counterReducer = (state = initialCounterState , action) => {
  switch (action.type) {
    case increment:
      return {
        ...state ,
        counterState : state.counterState + action.payload
      }
    case decrement:
      return {
        ...state ,
        counterState : state.counterState - action.payload
      }
  
    default:
      return state;
  }
};

// fetch states
const initialFetchState = {
  isLoading: false , 
  fetchedData : [] , 
  error : null
}

const fetchReducer = (state = initialFetchState , action) => {
  switch (action.type) {
    case requestApi:
      return {
        ...state ,
        isLoading : true 
      }
    case successApi:
      return {
        ...state , 
        isLoading : false  ,
        fetchedData : [...action.payload]
      }
    case failedApi:
      return {
        ...state , 
        isLoading : false  ,
        error : action.payload
      }
  
    default:
      return state;
  }
}

// root reducer

const rootReducer = combineReducers({
  counterReducer , fetchReducer
})

//store creation 

const store = createStore(rootReducer , applyMiddleware(thunk));

// store method

store.subscribe(() => {
  console.log(store.getState().fetchReducer);
})

// action despatch

// store.dispatch(incrementAction(100))


// store.dispatch(decrementAction(50))
store.dispatch(fetchData())
  

