/**
 * Changelog module
 * @module index.js
 */


/**
 * Required modules
 */
const path = require('path');
const yaml = require('write-yaml');
const slugify = require('slugify');
const minimist = require('minimist');
const { prompt } = require('enquirer');
const { sprintf } = require('sprintf-js');


/**
 * @const {Object}
 */
const argv = minimist(process.argv.slice(2));

/**
 * @const {String}
 */
const filepath = argv.path || './changelog/unreleased/';

/**
 * @const {String}
 */
const filename = argv.file || '%s-%s.yml';

/**
 * @const {String}
 */
const pattern = path.join(filepath, filename);


/**
 * Questions
 */
prompt([
    {
        type: 'text',
        name: 'message',
        hint: '... e.g. Bug ticket title',
        message: 'Changelog message',
        validate() {
            return this.value.trim() ? true : 'Must not be empty'
        }
    },
    {
        type: 'autocomplete',
        name: 'type',
        message: 'Type of change',
        initial: 2,
        hint: '... use arrow-keys, <return> to submit',
        choices: ['FIX', 'MISC', 'FEATURE', 'BC BREAK', 'IMPROVEMENT']
    },
    {
        type: 'text',
        name: 'issue',
        message: 'Jira ticket',
        hint: '... e.g. HD-987',
        validate() {
            return this.value.trim() ? true : 'Must not be empty'
        }
    },
    {
        type: 'text',
        name: 'merge-request',
        hint: '... e.g. 790',
        initial: 0,
        message: 'Merge Request',
        validate() {
            return !isNaN(this.value)
        }
    },
    {
        type: 'confirm',
        name: 'confirmed',
        message: 'Ready to create?',
        initial: true
    },

]).then(answers => {

    if (!answers['confirmed']) {
        return;
    }

    answers['merge-request'] = parseInt(
        answers['merge-request'],
        10
    );

    delete answers['confirmed'];

    const file = sprintf(
        pattern,
        slugify(answers['issue']),
        slugify(answers['message'].toLowerCase())
    );

    yaml(file, answers, error => {
        if (error) throw new Error(error);
    });

}).catch(console.error);
