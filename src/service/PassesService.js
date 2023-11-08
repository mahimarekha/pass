import requests from './httpService';
const PassesService = {
  getAllPasses() {
return requests.post(`/GetPasses`,{});
  },

  cretePasses(body){
    return requests.post('/PostPasses',body); 
  },
  deletePasses(body){
    return requests.delete(`/department/${body._id}`); 
  },
//   findRoleList(body){
//     return requests.post(`/department/find`,body); 
//   },
  upadePasses(body) {
    return requests.post(`/PutPasses`,body); 
  },
  

};
export default PassesService;
