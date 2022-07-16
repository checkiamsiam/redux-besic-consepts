const { combineReducers, createStore, applyMiddleware } = require("redux")
const { default: logger } = require("redux-logger")
const { default: thunk } = require("redux-thunk")



// variables 

const increment = 'increment'
const decrement = 'decrement'


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

// reducers 

const initialState = {
  counterState : 0
}

const counterReducer = (state = initialState , action) => {
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


// root reducer

const rootReducer = combineReducers({
  counterReducer ,
})

//store creation 

const store = createStore(rootReducer , applyMiddleware(thunk , logger));

// store method

store.subscribe(() => {
  console.log(store.getState());
})

// action despatch

store.dispatch(incrementAction(100))


store.dispatch(decrementAction(50))
  

