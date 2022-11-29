import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";
import Mark from "../Asset/mark.png";

const ApplicationModal = ({oopened, setOopened}:any) => {
  return (
      <Modal
        opened={oopened}
        onClose={() => setOopened(false)}
        classNames={{
          root: "m-auto",
          header: "!mb-0",
        }}
        centered
      >
        <div className="flex flex-col">
        <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                textAlign:'center'
                
            }}>
            <img src={Mark.src} style={{
                width:'60px'
            }} />
          <div style={{
            marginBottom:'5px'
          }}>
            <p
              style={{
                fontSize: "19px",
                color: "#3A3C41"
              }}
            >
              Congratulations!
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#3A3C41",
              }}
            >
              Your application has been completed successfully. Further details will be sent to your mail
            </p>
          </div>
          </div>
          <button
            onClick={() => setOopened(false)}
            style={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "700",
                marginTop:'10px',
              background: "#0DBF66",
              borderRadius: "8px",
              width: "100%",
              cursor: "pointer",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Go back to Job details
          </button>
        </div>
      </Modal>
    
  );
};
export default ApplicationModal;
