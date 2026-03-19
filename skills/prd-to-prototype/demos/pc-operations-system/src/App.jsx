import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Form, Input, Button, Descriptions, message } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

// Mock 数据
const orderColumns = [
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo', width: 160 },
  { title: '用户', dataIndex: 'userName', key: 'userName' },
  { title: '商品', dataIndex: 'product', key: 'product' },
  { title: '金额', dataIndex: 'amount', key: 'amount', render: (v) => `¥${v}` },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '下单时间', dataIndex: 'createTime', key: 'createTime', width: 170 },
];

const orderData = [
  { key: 1, orderNo: 'ORD202403160001', userName: '张三', product: '商品A x2', amount: 199, status: '已完成', createTime: '2024-03-16 10:30' },
  { key: 2, orderNo: 'ORD202403160002', userName: '李四', product: '商品B x1', amount: 89, status: '待发货', createTime: '2024-03-16 11:20' },
  { key: 3, orderNo: 'ORD202403160003', userName: '王五', product: '商品C x3', amount: 359, status: '已发货', createTime: '2024-03-16 09:15' },
  { key: 4, orderNo: 'ORD202403150004', userName: '赵六', product: '商品A x1', amount: 99, status: '已取消', createTime: '2024-03-15 16:45' },
  { key: 5, orderNo: 'ORD202403150005', userName: '孙七', product: '商品D x2', amount: 258, status: '已完成', createTime: '2024-03-15 14:20' },
];

const userColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
  { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime', width: 170 },
  { title: '状态', dataIndex: 'status', key: 'status' },
];

const userData = [
  { key: 1, id: 10001, username: '张三', phone: '138****1234', registerTime: '2024-01-10 09:00', status: '正常' },
  { key: 2, id: 10002, username: '李四', phone: '139****5678', registerTime: '2024-02-15 14:30', status: '正常' },
  { key: 3, id: 10003, username: '王五', phone: '136****9012', registerTime: '2024-03-01 11:20', status: '禁用' },
  { key: 4, id: 10004, username: '赵六', phone: '137****3456', registerTime: '2024-03-10 16:45', status: '正常' },
];

const productColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '商品名称', dataIndex: 'name', key: 'name' },
  { title: '分类', dataIndex: 'category', key: 'category' },
  { title: '库存', dataIndex: 'stock', key: 'stock' },
  { title: '售价', dataIndex: 'price', key: 'price', render: (v) => `¥${v}` },
  { title: '状态', dataIndex: 'status', key: 'status' },
];

const productData = [
  { key: 1, id: 1, name: '商品A', category: '服装', stock: 120, price: 99, status: '上架' },
  { key: 2, id: 2, name: '商品B', category: '数码', stock: 45, price: 299, status: '上架' },
  { key: 3, id: 3, name: '商品C', category: '食品', stock: 0, price: 39, status: '下架' },
  { key: 4, id: 4, name: '商品D', category: '服装', stock: 200, price: 129, status: '上架' },
];

function Dashboard() {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>数据概览</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="今日订单" value={128} suffix="笔" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="今日成交额" value={25680} prefix="¥" precision={2} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="总用户数" value={12458} suffix="人" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="待处理" value={12} suffix="项" />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="近7日趋势">
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: 8 }}>
              <span style={{ color: '#999' }}>图表占位（可接入 ECharts）</span>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="快捷操作">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button type="primary">新建订单</Button>
              <Button>商品上架</Button>
              <Button>导出数据</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function OrderList() {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>订单管理</h2>
      <Card>
        <Form layout="inline" style={{ marginBottom: 16 }}>
          <Form.Item label="订单号">
            <Input placeholder="请输入订单号" style={{ width: 180 }} />
          </Form.Item>
          <Form.Item label="状态">
            <Input placeholder="全部" style={{ width: 120 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
            <Button style={{ marginLeft: 8 }}>重置</Button>
          </Form.Item>
        </Form>
        <Table columns={orderColumns} dataSource={orderData} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}

function UserList() {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>用户管理</h2>
      <Card>
        <Form layout="inline" style={{ marginBottom: 16 }}>
          <Form.Item label="用户名">
            <Input placeholder="请输入用户名" style={{ width: 180 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
            <Button style={{ marginLeft: 8 }}>重置</Button>
          </Form.Item>
        </Form>
        <Table columns={userColumns} dataSource={userData} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}

function ProductList() {
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>商品管理</h2>
      <Card>
        <Form layout="inline" style={{ marginBottom: 16 }}>
          <Form.Item label="商品名称">
            <Input placeholder="请输入商品名称" style={{ width: 180 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
            <Button type="primary" style={{ marginLeft: 8 }}>新建商品</Button>
          </Form.Item>
        </Form>
        <Table columns={productColumns} dataSource={productData} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}

function Settings() {
  const [form] = Form.useForm();
  const handleSave = () => {
    message.success('保存成功');
  };
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>系统设置</h2>
      <Card title="基础配置">
        <Form form={form} layout="vertical" style={{ maxWidth: 400 }}>
          <Form.Item label="系统名称" name="siteName" initialValue="运营管理系统">
            <Input placeholder="请输入系统名称" />
          </Form.Item>
          <Form.Item label="客服电话" name="servicePhone" initialValue="400-123-4567">
            <Input placeholder="请输入客服电话" />
          </Form.Item>
          <Form.Item label="默认分页" name="pageSize" initialValue={10}>
            <Input type="number" placeholder="每页条数" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: '数据概览' },
    { key: 'orders', icon: <ShoppingCartOutlined />, label: '订单管理' },
    { key: 'users', icon: <UserOutlined />, label: '用户管理' },
    { key: 'products', icon: <AppstoreOutlined />, label: '商品管理' },
    { key: 'settings', icon: <SettingOutlined />, label: '设置' },
  ];

  const renderContent = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <OrderList />;
      case 'users': return <UserList />;
      case 'products': return <ProductList />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ height: 32, margin: 16, color: 'white', fontSize: 16, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          运营管理系统
        </div>
        <Menu
          theme="dark"
          selectedKeys={[page]}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => setPage(key)}
          style={{ marginTop: 8 }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: 24, padding: 24, background: '#fff', minHeight: 280 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
