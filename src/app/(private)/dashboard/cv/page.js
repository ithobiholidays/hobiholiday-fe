import AdminCvView from "@/views/admin/cv/AdminCvView";
import AdminTestimonialView from "@/views/admin/testimonial/AdminTestimonialView";
import React from "react";

const TestimonialViewPage = ({ params }) => {
  return <AdminCvView params={params} />;
};

export default TestimonialViewPage;
