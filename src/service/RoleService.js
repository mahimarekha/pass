import requests from './httpService';
const RoleService = {
  getAllRole() {
return requests.post(`/GetRoles`,{});
  },
//   getDepartmentById(id) {
//     return requests.get(`/department/${id}`);
//   },
  creteRole(body){
    return requests.post('/PostRoles',body); 
  },
  deleteRole(body){
    return requests.delete(`/department/${body._id}`); 
  },
  findRoleList(body){
    return requests.post(`/department/find`,body); 
  },
  upadeRole(body) {
    return requests.post(`/PutRoles`,body); 
  },
  

};
export default RoleService;
