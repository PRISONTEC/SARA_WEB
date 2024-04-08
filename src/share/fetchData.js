import fetchWithTimeout from '@gluons/react-native-fetch-with-timeout';

export default class fetchingData {


    static params = { method: 'GET',
        mode: 'cors', 
        headers: {
            "Content-type": "application/json", 
            "Access-Control-Allow-Origin": "*"},
        'Accept': 'application/json'
    } 

    static getData(ipUril, URI, callback) {
        fetch(ipUril + URI, this.params)
            .then((response) => {
                response.json()
                .then(
                    data => {
                        callback(data)}
                )} 
            )
    }

    static getDataPromise(ipUril, URI, _timeout) {
        return new Promise((resolve, reject) => {
            fetchWithTimeout(ipUril + URI, this.params, {timeout: _timeout}
            ).then( rpta =>
                resolve(rpta)      
            ).catch( (err) => {
                reject(err)}
            )
        })
    }

    static postDataPromise(ipUril, URI, params, _timeout) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };

        return new Promise((resolve, reject) => {
            fetchWithTimeout(ipUril + URI, requestOptions, {timeout: _timeout}
            ).then( rpta =>
                resolve(rpta)      
            ).catch( (err) => {
                console.log(err);
                reject(err)}
            )
        })
    }

    static deleteDataPromise(ipUril, URI, params, _timeout) {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };

        return new Promise((resolve, reject) => {
            fetchWithTimeout(ipUril + URI, requestOptions, {timeout: _timeout}
            ).then( rpta =>
                resolve(rpta)      
            ).catch( (err) => {
                console.log(err);
                reject(err)}
            )
        })
    }

    static deleteData(ipUril, URI, callback) { 

        fetch(ipUril + URI, this.params)
            .then((response) => {
                callback(response)                
            })
    }

    static postDataPrimise() {
        
    }
}