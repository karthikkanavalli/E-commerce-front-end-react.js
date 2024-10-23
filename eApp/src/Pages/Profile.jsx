import { useSelector } from "react-redux";

const Profile = () => {
  let user = useSelector((state) => state.auth.user);
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen gap-20 pt-8 bg-slate-200">
      <h1 className="text-3xl font-bold text-center text-slate-700">Profile</h1>

      <div className="flex w-3/5 gap-4 p-4 rounded-md shadow-xl h-4/5 shadow-slate-400">
        <div className="w-1/4 rounded-md h-72 bg-slate-200">
          <div className="w-1/2 m-auto rounded-full h-1/2 broder-2 bg-sky-600"></div>
          <span className="m-auto text-base font-emibold text-slate-700 ">
            {user.email}
          </span>
        </div>
        <div className="flex flex-col h-full gap-4 ">
          <div className="w-full p-2 h-28 bg-slate-200">
            <label
              htmlFor="name"
              className="text-xl font-semibold text-slate-800"
            >
              Name
            </label>
            <input
              className="w-full p-2 text-xl font-semibold border-2 rounded-md outline-none text-slate-800"
              readOnly
              type="text"
              value={user.name}
            />
          </div>
          <div className="w-full p-2 h-28 bg-slate-200">
            <label
              htmlFor="mobile"
              className="text-xl font-semibold text-slate-800"
            >
              Mobile
            </label>
            <input
              className="w-full p-2 mt-2 text-xl font-semibold border-2 rounded-md outline-none text-slate-800"
              readOnly
              type="text"
              value={user.mobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
