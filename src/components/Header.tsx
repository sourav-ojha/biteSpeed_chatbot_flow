import { useReactFlow } from "reactflow";
import { setToLS } from "../utils";

const Header = () => {
  const flow = useReactFlow();

  const handleSave = () => {
    setToLS("edges", flow.getEdges());
    setToLS("nodes", flow.getNodes());
  };

  return (
    <div className="w-full  bg-[#f3f3f3] ">
      <div className=" mx-4  h-[6vh] flex items-center justify-end">
        <button
          className="border-blue-500 border text-gray-700 bg-white rounded-md px-4 py-2 w-40 "
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Header;
