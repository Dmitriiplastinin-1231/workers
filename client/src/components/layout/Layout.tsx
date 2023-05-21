import React from "react";
import { Layout as AntLayout } from "antd";
import Header from "../header/Header";
import s from './Layout.module.css';

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className={s.main}>
            <Header />
            <AntLayout.Content style={{height: '100%'}}>
                {children}
            </AntLayout.Content>
        </div>
    )
}

export default Layout;