import requests from './httpService';
const MinisterService = {
  getAllMinister(body) {
return requests.post(`/GetMinisterList`,body);
  },

  getAllMinisterByVisitingPlace(id) {
  return requests.get(`/MinisterListwithVisitingPlaces/${id}`);
      },
  creteMinister(body){
    return requests.post('/PostMinisterList',body); 
  },
  deleteMinister(id){
    return requests.get(`/DeleteMinisterList/${id}`); 
  },
  findMinisterList(body){
    return requests.post(`/department/find`,body); 
  },
  upadeMinister(body) {
    return requests.post(`/PutMinisterList`,body); 
  },
  getRoleById(id) {
    return requests.get(`/MinisterList/${id}`,); 
  },
//   userLogin(body){
//     return requests.post(`/UserLogin`,body); 
//   },
//   userPasswordUpdate(body){
//     return requests.post(`/PostUserLogin`,body); 
//   },
//   userNameCheck(body){
//     return requests.post(`/CheckUserLogin`,body); 
//   }

  

};
export default MinisterService;
