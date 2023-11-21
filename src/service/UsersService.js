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
//   deleteDesignations(body){
//     return requests.delete(`/RemoveDesignations/${body._id}`); 
//   },
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
