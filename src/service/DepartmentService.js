import requests from './httpService';
const DepartmentService = {
  getAllDepartment() {
//     return Promise.resolve([{
//         "Depid": 10001,
//         "DepartmentCode": "SO",
//         "DepartmentName": "Secretariat offices",=
//         "DepartmentStatus": true,
//         "CreateBy": "Admin",
//         "CreateDateTime": "2023-10-27T05:46:44.893",
//         "UpdateBy": null,
//         "UpdateDateTime": null
// },
// ])
return requests.post(`/GetDepartments`,{});
  },
  getDepartmentById(id) {
    return requests.get(`/department/${id}`);
  },
  creteDepartment(body){
    return requests.post('/PostDepartments',body); 
  },
  deleteDepartment(id){
    return requests.delete(`/DeleteDepartments/${id}`); 
  },
  findDepartmentList(body){
    return requests.post(`/department/find`,body); 
  },
  upadeDepartment(body) {
    return requests.post(`/PutDepartments`,body); 
  },
  

};
export default DepartmentService;
