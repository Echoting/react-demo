const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {

    async function prompts(inquirer) {
        const inputs = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'moduleName',
                    message: '业务模块名称是什么? (不需要加入 Module 后缀)',
                    validate: utils.validators.required('业务模块名称')
                }
            ]);

        inputs.moduleName = inputs.moduleName + 'Module';
        inputs.moduleClass = _.upperFirst(_.camelCase(inputs.moduleName));
        inputs.moduleCSSWrapper = _.kebabCase(inputs.moduleName) + '-wrapper';

        return inputs;
    }

    /**
     * @def: template.pc-normal-module
     *  raw:
     *      moduleName
     *      layoutKey
     *      shouldInjectKey
     *      shouldInjectApp
     *  derived:
     *      moduleCSSWrapper
     *      moduleClass
     */
    plop.setGenerator('module', {

        prompts,

        actions: [
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{moduleClass}}/index.js',
                template: utils.template(__dirname, 'index.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{moduleClass}}/routes.js',
                template: utils.template(__dirname, 'routes.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{moduleClass}}/AppState.js',
                template: utils.template(__dirname, 'App.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{moduleClass}}/style.less',
                template: utils.template(__dirname, 'App.less')
            },
            
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{moduleClass}}/IndexPage/index.js',
                template: utils.template(__dirname, 'IndexPage/index.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{moduleClass}}/IndexPage/style.use.less',
                template: utils.template(__dirname, 'IndexPage/style.use.less')
            }
        ]
    });
};
