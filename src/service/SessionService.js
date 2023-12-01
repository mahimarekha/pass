import requests from './httpService';
const SessionService = {
  getAllSession() {
return requests.post(`/GetSessions`,{});
  },
//   getDepartmentById(id) {
//     return requests.get(`/department/${id}`);
//   },
  creteSession(body){
    return requests.post('/PostSession',body); 
  },
//   deleteRole(body){
//     return requests.delete(`/department/${body._id}`); 
//   },
//   findRoleList(body){
//     return requests.post(`/department/find`,body); 
//   },
  upadeSession(body) {
    return requests.post(`/PutSession`,body); 
  },
  getSessionById(id) {
    return requests.get(`/GetSessionFrom/${id}`,); 
  },
  GetLatestSessionFrom() {
    return requests.get(`/GetLatestSessionFrom`,); 
  },
};
export default SessionService;
