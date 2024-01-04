import requests from './httpService';
const DesignationsService = {
  getAllDesignations() {

return requests.post(`/GetDesignations`,{});
  },
//   getDepartmentById(id) {
//     return requests.get(`/Designations/${id}`);
//   },
  creteDesignations(body){
    return requests.post('/PostDesignations',body); 
  },
  
  deleteDesignations(body){
    return requests.delete(`/RemoveDesignations/${body._id}`); 
  },
//   findDepartmentList(body){
//     return requests.post(`/department/find`,body); 
//   },
//   upadeDepartment(body) {
//     return requests.post(`/PutDepartments`,body); 
//   },
  

};
export default DesignationsService;
