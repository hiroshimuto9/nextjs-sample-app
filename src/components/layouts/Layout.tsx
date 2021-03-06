import React, { ReactNode } from "react";
import style from "@/components/layouts/Layout.module.css";
import { MenuBar } from "@/components/uiParts/MenuBar";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={style.container}>
      <div className={style.side}>
        <MenuBar />
      </div>
      <div className={style.main}>{children}</div>
    </div>
  );
};
