import requests from './httpService';
const VisitingPassesService = {
  getAllVisitingPasses() {

return requests.post(`/GetVisitingPasses`,{});
  },
  getVisitingPassesById(id) {
    return requests.get(`/VisitingPasses/${id}`);
  },
  creteVisitingPasses(body){
    return requests.post('/PostVisitingPasses',body); 
  },
//   deleteDesignations(body){
//     return requests.delete(`/RemoveDesignations/${body._id}`); 
//   },
//   findDepartmentList(body){
//     return requests.post(`/department/find`,body); 
//   },
  upadeVisitingPasses(body) {
    return requests.post(`/PutVisitingPasses`,body); 
  },
  

};
export default VisitingPassesService;
