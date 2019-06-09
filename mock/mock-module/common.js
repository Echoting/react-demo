module.exports = [
    // 统一做的转发, 根据相应需求修改
    {test: '/success', mock: '../mock/mock-data/main'},
    {test: '/failure', mock: '../mock/mock-data/main'},
]