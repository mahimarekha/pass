import requests from './httpService';
const UsersService = {
  getAllUsers() {

return requests.post(`/GetUsers`,{});
  },
//   getDepartmentById(id) {
//     return requests.get(`/Designations/${id}`);
//   },
  creteUsers(body){
    return requests.post('/PostUsers',body); 
  },
  
  deleteUsers(id){
    return requests.get(`/DeleteUser/${id}`); 
  },
//   findDepartmentList(body){
//     return requests.post(`/department/find`,body); 
//   },
  upadeUsers(body) {
    return requests.post(`/PutUsers`,body); 
  },
  getDepartmentWiseUsers(body) {
    return requests.post(`/GetDepartmentWiseUsers`,body); 
  },

};
export default UsersService;
