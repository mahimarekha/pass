import requests from './httpService';
const VisitingPlacesService = {
  getAllVisitingPlaces() {
return requests.post(`/GetVisitingPlaces`,{});
  },

  creteVisitingPlaces(body){
    return requests.post('PostVisitingPlaces',body); 
  },
  // deleteMinister(id){
  //   return requests.get(`/DeleteMinisterList/${id}`); 
  // },
  deleteVisitingPlacesRole(id){
    return requests.delete(`/DeleteVisitingPlaces/${id}`); 
  },
  // findRoleList(body){
  //   return requests.post(`/department/find`,body); 
  // },
  upadeVisitingPlaces(body) {
    return requests.post(`/PutVisitingPlaces`,body); 
  },
  

};
export default VisitingPlacesService;
