import { Layout, Space, Typography, Button } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DefaultButton from '../default-button/DefaultButton';
import s from './Header.module.css';
import { Paths } from '../../paths';

const Header = () => {
    return(
        <Layout.Header className={s.header}>
            <Space>
                <TeamOutlined className={s.teamIcon} />
                <Link to={ Paths.home }>
                    <DefaultButton type='ghost'>
                        <Typography.Title level={ 1 }>Employees</Typography.Title>
                    </DefaultButton>
                </Link>
            </Space>
            <Space>
                <Link to={ Paths.login }>
                    <DefaultButton type='ghost' icon={ <UserOutlined /> }>
                        login
                    </DefaultButton>
                </Link>
                <Link to={ Paths.register }>
                    <DefaultButton type='ghost' icon={ <LoginOutlined /> }>
                        Register
                    </DefaultButton>
                </Link>
            </Space>
        </Layout.Header>
    )
}

export default Header;