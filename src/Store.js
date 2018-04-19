import { createStore,applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./reducers"
import { createLogger } from "redux-logger"
const loggerMiddleware = createLogger()
const configureStore = ()=>{
    return createStore (
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
export default configureStore