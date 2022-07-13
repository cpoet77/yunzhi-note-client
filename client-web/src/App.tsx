import React from 'react';
import './App.css';
import {UserOutlined} from '@ant-design/icons';
import {ProLayout} from '@ant-design/pro-layout';
import {Avatar, Breadcrumb, Col, Input, Row} from 'antd';
import {Menus} from './Menu';
import {Toolbar} from './Toolbar'
import Vditor from 'vditor';

function App() {
    const [vd, setVd] = React.useState<Vditor>();
    React.useEffect(() => {
        const vditor = new Vditor("editorContent", {
            width: '100%',
            height: '100%',
            toolbar: Toolbar,
            toolbarConfig: {
                pin: true
            },
            after: () => {
                vditor.setValue("`Vditor` 最小代码示例");
                setVd(vditor);
            }
        });
    }, []);

    return (
        <div
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                location={{
                    pathname: '/node',
                }}
                collapsedButtonRender={false}
                collapsed
                iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
                menuHeaderRender={() => (
                    <Avatar shape="circle" size="small" icon={<UserOutlined/>}/>
                )}
                route={{
                    routes: [
                        {
                            path: '/node',
                            name: '我的笔记',
                            icon: 'icon-shoucang1',
                        },
                        {
                            path: '/home/overview',
                            name: 'FaceBook',
                            icon: 'icon-facebook',
                        },
                        {
                            path: '/home/search',
                            name: 'Twitter',
                            icon: 'icon-twitter',
                        },
                    ],
                }}
                headerRender={false}
                disableContentMargin
            >
                <ProLayout
                    location={{
                        pathname: '/home/overview',
                    }}
                    route={{
                        routes: Menus,
                    }}
                    navTheme="light"
                    style={{
                        height: '400px',
                    }}
                    headerContentRender={() => (
                        <Row>
                            <Col>
                                <Breadcrumb className="note-path-breadcrumb">
                                    <Breadcrumb.Item>笔记</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <a href="">我的笔记</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <a href="">测试笔记</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>第一个笔记.md</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col span={1}/>
                            <Col className="note-header-sync-tip">上次同步时间：2022年11月03日 15:44:55</Col>
                        </Row>
                    )}
                    rightContentRender={false}
                    disableContentMargin={true}
                    menuHeaderRender={() => (
                        <Input placeholder="搜索一下" type="text"/>
                    )}
                >
                    <div id="editorContent" className="vditor"/>
                </ProLayout>
            </ProLayout>
        </div>
    );
}

export default App;
