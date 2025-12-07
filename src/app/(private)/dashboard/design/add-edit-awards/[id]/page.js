import EditAwardsView from "@/views/admin/design/add-edit-awards/EditAwardsView";
import { use } from "react";

const EditAwardsViewPage = ({ params }) => {
  return <EditAwardsView params={use(params)} />;
};

export default EditAwardsViewPage;
