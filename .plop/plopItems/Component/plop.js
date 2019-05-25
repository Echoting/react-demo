const npath = require('path');
const _ = require('lodash');

module.exports = function(plop, data, utils) {
    function prompts(inquirer) {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'compName',
                    message: '组件名称是什么?'
                },
                // {
                //     type: 'list',
                //     default: 'yes',
                //     choices: ['yes', 'no'],
                //     name: 'shouldUseReaction',
                //     message: '是否需要引入 ReactionManager 的联动管理模式?'
                // },
                {
                    type: 'confirm',
                    default: true,
                    name: 'useDemo',
                    message: '是否需要引入 demo?'
                }
            ])
            .then(inputs => {
                const compClass = _.upperFirst(_.camelCase(inputs.compName));
                inputs.compClass = compClass;
                inputs.compCSSWrapper = _.kebabCase(inputs.compName) + '-wrapper';
                inputs.compReactClass = _.upperFirst(_.camelCase(inputs.compName)) + 'View';
                inputs.compStateClass = _.upperFirst(_.camelCase(inputs.compName)) + 'State';

                return inputs;
            });
    }

    /**
     * @def template.component-vm
     *  raw:
     *      compName
     *      shouldInjectApp yes | no
     *      shouldUseReaction: yes | no
     *  derived:
     *      compClass
     *      compCSSWrapper
     *      compReactClass
     *      compStateClass
     */
    plop.setGenerator('component', {
        prompts,
        actions: function(inputs) {
            const compPath = '{{currentPath}}/{{compClass}}Comp';

            let actions = [
                {
                    type: 'add',
                    data,
                    path: compPath + '/index.js',
                    template: utils.template(__dirname, 'index.js')
                },
                {
                    type: 'add',
                    data,
                    path: compPath + '/style.use.less',
                    template: utils.template(__dirname, 'style.use.less')
                }
            ];

            if (inputs.useDemo) {
                actions = actions.concat([
                    {
                        type: 'add',
                        data,
                        path: compPath + '/_demo-normal/index.js',
                        template: utils.template(__dirname, '_demo-normal/index.js')
                    },
                    {
                        type: 'add',
                        data,
                        path: compPath + '/_demo-normal/style.use.less',
                        template: utils.template(__dirname, '_demo-normal/style.use.less')
                    }
                ]);
            }

            return actions;
        }
    });
};
