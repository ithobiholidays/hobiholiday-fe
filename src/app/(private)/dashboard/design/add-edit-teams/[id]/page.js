import EditTeamsView from "@/views/admin/design/add-edit-teams/EditTeamsView";
import { use } from "react";

const EditTeamsViewPage = ({ params }) => {
  return <EditTeamsView params={use(params)} />;
};

export default EditTeamsViewPage;
