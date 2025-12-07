import EditPackagesView from "@/views/admin/tour-packages/add-edit-packages/EditPackagesView";
import { use } from "react";

const EditPackagesViewPage = ({ params }) => {
  return <EditPackagesView params={use(params)} />;
};

export default EditPackagesViewPage;
