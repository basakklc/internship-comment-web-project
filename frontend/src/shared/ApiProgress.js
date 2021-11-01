import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'

export const useApiProgress = (apiPath) => {
    const [ pendingApiCall, setPendingApiCall ]=useState(false)
    useEffect(() => {
        let requestInterceptor, responseInterceptor
        const updateApiCallFor = (url, inProgress) => {  
            if(url.startsWith(apiPath)){
               setPendingApiCall(inProgress)
            }
        }
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request)=> {
                updateApiCallFor(request.url,true)
                return request  
            })
    
            responseInterceptor = axios.interceptors.response.use((response) => {
                updateApiCallFor(response.config.url,false)
                return response
            },(error) => {
                updateApiCallFor(error.config.url,false)
                throw error
            })
        }

        
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }


        registerInterceptors()

        return function unmount(){
            unregisterInterceptors()
        }
    })

    return pendingApiCall
}

export function withApiProgress(WrappedComponent, apiPath){

    return class extends Component {
        static displayName ='ApiProgress';
        state = {
            pendingApiCall: false
        }
    
        componentDidMount(){
           this.registerInterceptors()
        }

        componentWillUnmount(){
           this.unregisterInterceptors()
        }
    

        registerInterceptors = () => {
            this.requestInterceptor = axios.interceptors.request.use((request)=> {
                console.log("run",apiPath);
                this.updateApiCallFor(request.url,true)
                return request  
            })
    
            this.responseInterceptor = axios.interceptors.response.use((response) => {
                this.updateApiCallFor(response.config.url,false)
                return response
            },(error) => {
                this.updateApiCallFor(error.config.url,false)
                throw error
            })
        }

        unregisterInterceptors = () => {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

    
        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall
            return (
                <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
               
               /* <div>
                    {React.cloneElement(this.props.children, {pendingApiCall:this.state.pendingApiCall})}
                </div>*/
            );
        }
    }
}

