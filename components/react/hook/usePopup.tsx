import { useCallback, useState } from "react";
import { Popup, PopupProps } from "react-vant";

interface CustomPopupProps extends PopupProps {
  height?: string; //弹窗高度
  description?: string; //弹窗描述
}

function usePopup() {
  const [popupProps, setPopupProps] = useState<CustomPopupProps>({
    visible: false
  });

  const onClose = useCallback(() => {
    setPopupProps(prevProps => ({ ...prevProps, visible: false }));
  }, []);

  const onOpen = useCallback((props: CustomPopupProps) => {
    setPopupProps({ ...props, visible: true });
  }, []);

  const PopupComponent = useCallback(
    () => (
      <Popup
        {...popupProps}
        style={popupProps.height ? { height: popupProps.height } : {}}
        teleport={document.getElementById("root")}
        onClose={onClose}
        safeAreaInsetBottom
        round
        closeIconPosition={popupProps.closeIconPosition || "top-right"}
        position={popupProps.position || "bottom"}
        descrition={popupProps.description || ""}
      >
        {popupProps.children}
      </Popup>
    ),
    [popupProps, onClose]
  );

  return {
    PopupComponent,
    onOpen,
    onClose
  };
}

export default usePopup;
