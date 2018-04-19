import React,{ Component } from "react"
import { Provider } from "react-redux"
import configureStore from "../Store"
import AsyncApp from "./AsyncApp"
const store = configureStore()
console.log(store.getState)
export default class Root extends Component{
    render(){
        return (
            <Provider store={store}>
                <AsyncApp></AsyncApp>
            </Provider>
        )
    }
}
export {store}