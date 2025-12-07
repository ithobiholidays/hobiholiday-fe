import EditTestimonyView from "@/views/admin/testimonial/EditTestimonialView";
import { use } from "react";

const TestimonialViewPage = ({ params }) => {
  return <EditTestimonyView params={use(params)} />;
};

export default TestimonialViewPage;
