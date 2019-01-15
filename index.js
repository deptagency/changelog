/**
 * Changelog module
 * @module index.js
 */


/**
 * Required modules
 */
const yaml = require('write-yaml');
const slugify = require('slugify');
const { prompt } = require('enquirer');
const { sprintf } = require('sprintf-js');


/**
 * @const {String}
 */
const FILE_PATTERN = './changelog/unreleased/%s-%s.yml';

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

    const filepath = sprintf(
        FILE_PATTERN,
        slugify(answers['issue']),
        slugify(answers['message'].toLowerCase())
    );

    yaml(filepath, answers, error => {
        if (error) throw new Error(error);
    });

}).catch(console.error);
