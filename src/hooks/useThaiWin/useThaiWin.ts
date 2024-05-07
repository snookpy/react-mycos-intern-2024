import { useCallback, useEffect, useRef, useState } from "react";
import { enterThaiWin, exitThaiWin } from "../../api/weWinApi";

const useThaiWin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const isComponentActive = useRef<boolean>(false);
  const isEntered = useRef<boolean>(false);

  useEffect(() => {
    isComponentActive.current = true;
    return () => {
      isComponentActive.current = false;
      if (isEntered.current) {
        exit();
      }
    };
  }, []);

  const enter = useCallback(() => {
    if (!isEntered.current) {
      try {
        enterThaiWin();
        if (isComponentActive.current) {
          setIsLogin(true);
          isEntered.current = true;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const exit = useCallback(() => {
    if (isEntered.current) {
      try {
        exitThaiWin();
        if (isComponentActive.current) {
          setIsLogin(false);
          isEntered.current = false;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return [isLogin, enter, exit] as const;
};

export default useThaiWin;
