import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../pages/home/home';
import Goods from '../pages/goods/goods';
import Detail from '../pages/detail/detail';
import Active from '../pages/active/active' 

const routes = [
    {
        path: '/',
        exact: true,
        // sidebar: () => <div>机蜜首页</div>,
        main: Home
    },
    {
        path: '/goods',
        exact: true,
        // sidebar: () => <div>商品专区</div>,
        main: Goods
    },
    {
        path: '/detail',
        exact: true,
        // sidebar: () => <div>商品详情</div>,
        main: Detail
    },
    {
        path: '/active',
        exact: true,
        // sidebar: () => <div>机蜜活动</div>,
        main: Active
    }
]

export default routes