import requests from './httpService';
const VisitingPlacesService = {
  getAllVisitingPlaces() {
return requests.post(`/GetVisitingPlaces`,{});
  },

  creteVisitingPlaces(body){
    return requests.post('PostVisitingPlaces',body); 
  },
  deleteVisitingPlacesRole(body){
    return requests.delete(`/department/${body._id}`); 
  },
  // findRoleList(body){
  //   return requests.post(`/department/find`,body); 
  // },
  upadeVisitingPlaces(body) {
    return requests.post(`/PutVisitingPlaces`,body); 
  },
  

};
export default VisitingPlacesService;
