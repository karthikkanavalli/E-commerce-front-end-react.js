import { useEffect, useState } from "react"
import {  useHelpers } from "./helpers"

const Users = () => {
  let [users, setUsers] = useState([])
  
  const { fetchUsers } = useHelpers();

  useEffect(() => {
      (async () => {
        try {
          let result = await fetchUsers();
          setUsers([...result.users]);
        } catch (error) {
          console.log("Error while fetching users", error);
        }
      })();
    console.log("from users")
  },[])


  // useEffect(() => {
  //   handleUsers()
  // }, [])
  
  console.log(  users.length) 

  return (
    <>
      {" "}
      {users.length ? (
        <div className="w-full p-4">
          <h1 className="mb-4 text-2xl font-bold text-center text-slate-700">
            Users
            <span className="text-base font-medium underline text-slate-600 float-end">
              Total Products :{users?.length}
            </span>
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border bg-slate-700 text-slate-50">
                    Name
                  </th>
                  <th className="p-2 text-left border bg-slate-700 text-slate-50">
                    Email
                  </th>
                  <th className="p-2 text-left border bg-slate-700 text-slate-50">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border border-gray-300">{user.name}</td>
                    <td className="p-2 border border-gray-300">{user.email}</td>
                    <td className="p-2 border border-gray-300">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Users