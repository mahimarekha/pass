import requests from './httpService';
const VisitingPassesService = {
  getAllVisitingPasses() {

return requests.post(`/GetVisitingPasses`,{});
  },
  getAllVisitingPassesByDate(data) {

    return requests.post(`/GetVisitingPassesWithDates`,data);
      },
  getVisitingPassesById(id) {
    return requests.get(`/VisitingPasses/${id}`);
  },
  getQrCode(id) {
    return requests.get(`/GetQrCode/${id}`);
  },
  creteVisitingPasses(body){
    return requests.post('/PostVisitingPasses',body); 
  },
  cretePostVisitingPasses(body){
    return requests.post('/PostVisitingPassesList',body); 
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
