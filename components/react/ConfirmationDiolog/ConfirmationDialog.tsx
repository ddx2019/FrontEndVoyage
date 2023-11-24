import { Dialog } from "react-vant";
import React from "react";
import "./confirm-dialog.scoped.scss";

interface ICustomDialogProps {
  titleTxt?: string;
  subTitleTxt?: string;
  confirmTxt?: string;
  visible: boolean;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ICustomDialogProps> = ({
  titleTxt = "自动识图成功",
  subTitleTxt = "请核对信息是否正确，如有误可以自行修改",
  confirmTxt = "确定",
  visible,
  onConfirm
}) => {
  return (
    <Dialog
      className="confirm-dialog"
      visible={visible}
      title={
        <p className="dialog-header">
          {/* icon-fulfilled是上传到iconfont图标库的图标名 */}
          <span className="iconfont icon-fulfilled"></span>
          <span className="title">{titleTxt}</span>
        </p>
      }
      message={<p className="sub-title">{subTitleTxt}</p>}
      footer={
        <button className="confirm-btn" onClick={onConfirm}>
          {confirmTxt}
        </button>
      }
    />
  );
};

export default ConfirmDialog;
