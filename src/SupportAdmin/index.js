import React from "react";

import { ChatEngine } from "react-chat-engine";

import "./SupportAdmin.css";

const SupportAdmin = () => {
  return (
    <div className="support-admin">
      <div className="support-admin-content">
        <ChatEngine
          projectID={process.env.REACT_APP_CE_PROJECT_ID}
          userName="Uptown Gown"
          userSecret="uptowngown"
          height="calc(100vh - 12px)"
        />
      </div>
    </div>
  );
};

export default SupportAdmin;
