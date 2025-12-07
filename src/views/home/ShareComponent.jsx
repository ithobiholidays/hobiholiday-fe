import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  RedditShareButton,
  LineShareButton,
  EmailShareButton,
  ViberShareButton,
} from "react-share";

import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
  FaRedditAlien,
  FaLine,
  FaEnvelope,
  FaViber,
} from "react-icons/fa";

// Generic circular icon wrapper
const CustomIcon = ({ bgColor, Icon }) => (
  <div
    className="p-1 rounded-full flex items-center justify-center m-1 hover:opacity-80"
    style={{ backgroundColor: bgColor }}
  >
    <Icon color="white" size={20} />
  </div>
);

const ShareComponent = ({ shareUrl = "", title = "Check this out!" }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <FacebookShareButton
        url={shareUrl}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#3b5998" Icon={FaFacebookF} />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#1DA1F2" Icon={FaTwitter} />
      </TwitterShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#25D366" Icon={FaWhatsapp} />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={shareUrl}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#0077B5" Icon={FaLinkedinIn} />
      </LinkedinShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#0088cc" Icon={FaTelegramPlane} />
      </TelegramShareButton>

      <RedditShareButton
        url={shareUrl}
        title={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#FF4500" Icon={FaRedditAlien} />
      </RedditShareButton>

      <LineShareButton
        url={shareUrl}
        title={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#00C300" Icon={FaLine} />
      </LineShareButton>

      <EmailShareButton
        url={shareUrl}
        subject={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#888888" Icon={FaEnvelope} />
      </EmailShareButton>

      <ViberShareButton
        url={shareUrl}
        title={title}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to modal triggers
        }}
      >
        <CustomIcon bgColor="#665CAC" Icon={FaViber} />
      </ViberShareButton>
    </div>
  );
};

export default ShareComponent;
