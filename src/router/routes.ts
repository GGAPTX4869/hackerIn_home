export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    name: 'Register',
    meta: {
      title: '注册',
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'Close',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'Select',
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/hackerin',
    children:[{
      path: '/hackerin',
      component: () => import('@/views/hackerin/index.vue'),
      name: 'Hackerin',
      meta: {
        title: '首页',
        hidden: false,
      }
    }]
  },

  {
    path: '/h1',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '赛题',
      hidden: false,
    },
    redirect:'/h1/challenge',
    children:[{
      path: '/h1/challenge',
      component: () => import('@/views/challenge/index.vue'),
      name: 'Challenge',
      meta: {
        title: '赛题',
        hidden: false,
      }
    }
    ]
  },

  {
    path: '/h2',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '动态',
      hidden: false,
    },
    redirect:'/h2/action',
    children:[{
      path: '/h2/action',
      component: () => import('@/views/action/index.vue'),
      name: 'Action',
      meta: {
        title: '动态',
        hidden: false,
      }
    }
    ]
  },
  {
    path: '/h3',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '公告',
      hidden: false,
    },
    redirect:'/h3/notice',
    children:[{
      path: '/h3/notice',
      component: () => import('@/views/notice/index.vue'),
      name: 'Notice',
      meta: {
        title: '公告',
        hidden: false,
      }
    }
    ]
  },

  {
    path: '/h4',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '排行榜',
      hidden: false,
    },
    redirect:'/h4/rank',
    children:[{
      path: '/h4/rank',
      component: () => import('@/views/rank/index.vue'),
      name: 'Rank',
      meta: {
        title: '排行榜',
        hidden: false,
      }
    }
    ]
  },
  {
    path: '/h8',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: false,
    },
    redirect:'/h8/wp',
    children:[{
      path: '/h8/wp',
      component: () => import('@/views/wp/index.vue'),
      name: 'Wp',
      meta: {
        title: 'WP库',
        hidden: false,
      }
    },

    ]
  },
  {
    path: '/h9',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: false,
    },
    redirect:'/h9/team',
    children:[{
      path: '/h9/team',
      component: () => import('@/views/team/index.vue'),
      name: 'Team',
      meta: {
        title: '队伍中心',
        hidden: false,
      }
    }
    ]
  },
  {
    path: '/h5',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: false,
    },
    redirect:'/h5/competition',
    children:[{
      path: '/h5/competition',
      component: () => import('@/views/competition/index.vue'),
      name: 'Competition',
      meta: {
        title: '赛事中心',
        hidden: false,
      }
    }
    ]
  },
  {
    path: '/h6',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h6/user/info',
    children:[{
      path: '/h6/user/info',
      component: () => import('@/views/user/info/index.vue'),
      name: 'UserInfo',
      meta: {
        title: '用户信息',
        hidden: true,
      }
    }
    ]
  },
  {
    path: '/h7',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h7/challenge/info',
    children:[{
      path: '/h7/challenge/info',
      component: () => import('@/views/challenge/info/index.vue'),
      name: 'ChallengeInfo',
      meta: {
        title: '赛题信息',
        hidden: true,
      }
    },
    ]
  },
  {
    path: '/h7/challenge/add',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h7/challenge/add',
    children:[{
      path: '/h7/challenge/add',
      component: () => import('@/views/challenge/add/index.vue'),
      name: 'ChallengeAdd',
      meta: {
        title: '新增赛题',
        hidden: true,
      }
    },
    ]

  },
  {
    path: '/h9/team/add',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h9/team/add',
    children:[{
      path: '/h9/team/add',
      component: () => import('@/views/team/add/index.vue'),
      name: 'AddTeam',
      meta: {
        title: '新增队伍',
        hidden: true,
      }
    },
    ]
  },
  {
    path: '/h8/wp/add',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h8/wp/add',
    children:[{
      path: '/h8/wp/add',
      component: () => import('@/views/wp/add/index.vue'),
      name: 'AddWp',
      meta: {
        title: '新增WP',
        hidden: true,
      }
    },
    ]
  },
  {
    path: '/h10',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h10/team/info',
    children:[{
      path: '/h10/team/info',
      component: () => import('@/views/team/info/index.vue'),
      name: 'TeamInfo',
      meta: {
        title: '队伍信息',
        hidden: true,
      }
    },
    ]
  },
  {
    path: '/tips',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/tips/success',
    children:[{
      path: '/tips/success',
      component: () => import('@/views/tips/success/index.vue'),
      name: 'Success',
      meta: {
        title: '成功',
        hidden: true,
      }
    },
    ]
  },

  {
    path: '/h10/myteam',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h10/myteam/info',
    children: [
      {
        path: '/h10/myteam/info',
        component: () => import('@/views/team/myteam/index.vue'),
        name: 'MyTeamInfo',
        meta: {
          title: '我的队伍信息',
          hidden: true,
        }
      }
    ]
  },

  {
    path: '/h11/notice',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h11/notice/info',
    children: [
      {
        path: '/h11/notice/info',
        component: () => import('@/views/notice/info/index.vue'),
        name: 'NoticeInfo',
        meta: {
          title: '公告信息',
          hidden: true,
        }
      }
    ]
  },

  {
    path: '/h6/private',
    component: () => import('@/layout/index.vue'),
    name: '',
    meta: {
      title: '',
      hidden: true,
    },
    redirect:'/h6/private/info',
    children: [
      {
        path: '/h6/private/info',
        component: () => import('@/views/user/private/info/index.vue'),
        name: 'PrivateInfo',
        meta: {
          title: '个人信息',
          hidden: true,
        }
      }
    ]
  }

]
