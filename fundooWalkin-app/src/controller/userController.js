import axios from 'axios';
import dataBase from '../config'

const auth = {
    login(data) {
        console.log("data in userctr-->" + JSON.stringify(data));

        var headers = {
            'Content-Type': 'application/json'
        }
        try {
            return axios.post("https://fundoowalkin-backend-stg.incubation.bridgelabz.com:443/walkin/admin", data, { headers: headers })
                .then(response => {
                    // Save token to local storage
                    // console.log('response in config---' + JSON.stringify(response))
                    // localStorage.setItem('token', response.data.token)
                    return response
                })

        }
        catch (error) {
            console.log("error in usectr--" + error)
            return Promise.resolve(false)

        }
    }
    ,

    getCount() {
        console.log("data in userctr of get count-->");

        var headers = {
            'Content-Type': 'application/user/count/json'
        }
        try {
            return axios.get("https://fundoowalkin-backend-stg.incubation.bridgelabz.com:443/walkin/user/count", { headers: headers })
                .then(response => {
                    // Save token to local storage
                    // console.log('response in config---' + JSON.stringify(response))
                    // localStorage.setItem('token', response.data.token)
                    return response
                })

        }
        catch (error) {
            console.log("error in usectr--" + error)
            return Promise.resolve(false)

        }
    },
    getUser(value) {
        console.log("data in userctr of get user-->" + value);
        var formData = new FormData()
        // formData.append(location=value)
        // var data =[ {
        //    "location": "mumbai"
        // }]
        // console.log("data in userctr of get user-->"+JSON.stringify(data));
        var headers = {
            'Content-Type': 'application/user/count/json'
        }
        try {
            return axios.get("https://fundoowalkin-backend-stg.incubation.bridgelabz.com:443/app/walkin/users?location=" + value, { headers: headers })
                .then(response => {
                    // Save token to local storage
                    // console.log('response in config--- for location' + JSON.stringify(response))
                    // localStorage.setItem('token', response.data.token)
                    return response
                })

        }
        catch (error) {
            console.log("error in usectr--" + error)
            return Promise.resolve(false)

        }
    },
    async   updateUser(data) {
        var userData = [{
            "codeSkills": data.codeSkills,
            "comm": data.comm,
            "createdDate": data.createdDate,
            "emailId": data.emailId,
            "gender": data.gender,
            "id": data.id,
            "insertDate": data.insertDate,
            "insertId": data.insertId,
            "location": data.location,
            "mobileNo": data.mobileNo,
            "name": data.name,
            "passion": data.passion,
            "remark": data.remark,
            "source": data.source,
            "sourceOtherDesc": data.sourceOtherDesc,
            "status": data.status,
            "updateDate": data.updateDate,
            "updateId": data.updateId,
            "registrationNumber": data.registrationNumber,
            "activation": data.activation,
            "uId": data.uId
        }]
        console.log("data in userctr of update user-->" + JSON.stringify(data));

        var headers = {
            'Content-Type': 'application/json'
        }
        try {
            return axios.put("https://fundoowalkin-backend-stg.incubation.bridgelabz.com:443/walkin/updatestatus ", userData, { headers: headers })
                .then(response => {

                    // Save token to local storage
                    console.log('response in config---' + response.status)
                    // localStorage.setItem('token', response.data.token)




                    return response;
                })


        }
        catch (error) {
            console.log("error in usectr--" + error)
            return Promise.resolve(false)

        }
    },
    getCountByCity() {
        var headers = {
            "Content-Type": "application/json"
        };
        try {
            return axios
                .get(
                    "https://fundoowalkin-backend-stg.incubation.bridgelabz.com:443/app/walkin/user/count/statuswithcity",
                    { headers: headers }
                )
                .then(response => {
                    console.log("count data in city controller==>" + response);

                    return response;
                });
        } catch (error) {
            console.log("error in count city==>  " + error);
            return Promise.resolve(false);
        }
    },
    getChat() {
        var headers = {
            "Content-Type": "application/json"
        };
        let today = new Date();
        let month = today.getMonth() + 1;
        console.log("month==>  " + month);

        var date = today.getFullYear() + "-" + month + "-" + today.getDate()
        console.log("date===> " + date);
        try {

            return axios.get("https://fundoowalkin-backend-stg.incubation.bridgelabz.com/app/walkin/user/updatedusers"
            , { headers: headers })
                .then(response => {
                    console.log("count data in city controller==>" + response);

                    return response;
                });
        } catch (error) {
            console.log("error in count city==>  " + error);
            return Promise.resolve(false);
        }
    }

}

export default auth;