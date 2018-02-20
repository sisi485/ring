const fetch = require('node-fetch');

const rootUrl = "http://192.168.178.22:80/api/p2Hk18EfsISvatK3lrxF13j3rYnCoOF2XfRMwPFG";
class HueApi {

    //static rootUrl = "http://192.168.178.22/api/p2Hk18EfsISvatK3lrxF13j3rYnCoOF2XfRMwPFG";

    static toggleLight(id, state) {

        return fetch(rootUrl + "/lights/" + id + "/state", {
            method:"PUT",
            body:JSON.stringify({on: state})
        }).then(function (resp) {
            return resp.json();
        });
    }


    static toggleLightState(id, state) {

        return fetch(rootUrl + "/lights/" + id + "/state", {
            method:"PUT",
            body:JSON.stringify(state)
        }).then(function (resp) {
            return resp.json();
        });
    }

    static getLights() {
        console.log(rootUrl + '=rootUrl');
        return fetch (rootUrl + "/lights")
            .then(function (resp) {
                console.log(resp.status+ '=status');
                return resp.json();
            })
            .then(function (data) {
                delete data["1"];
                console.log(data + '=data');
                return data;
            });
    }

    static setScene(id) {
        return fetch(rootUrl + "/groups/1/action", {
            method:"PUT",
            body:JSON.stringify({scene: id})
        }).then(function (resp) {
            return resp.json();
        });
    }

    static getScenes() {
//Todo
        return fetch("./assets/scenes.json")
            .then(function (response) {

                return response.json();
            });
    }

    static toggleAllLights(lights, state) {

        for(const id in lights){
            this.toggleLight(id, state);
        }
    }

    static async toggleAllLightState(lights, state) {

        for(const id in lights){


            if (state)
                await this.toggleLightState(id, state);
            else
                await this.toggleLightState(id, lights[id].state)
        }
    }
}



module.exports = HueApi;