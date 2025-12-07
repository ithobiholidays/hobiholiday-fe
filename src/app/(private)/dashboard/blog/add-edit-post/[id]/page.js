import EditPostView from "@/views/admin/blog/add-edit-post/EditPostView";
import { use } from "react";

const EditPostViewPage = ({ params }) => {
  return <EditPostView params={use(params)} />;
};

export default EditPostViewPage;
